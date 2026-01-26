import { NextResponse } from "next/server"
import type COS from "cos-nodejs-sdk-v5"

export const runtime = "nodejs"

const MODEL = "doubao-seed-1-6-flash-250828"

const SYSTEM_MESSAGE =
  "你是一个面部特征分析师，懂得将图片解读为精准的数据和美学建议。请严格按照用户的要求生成内容，并在同一条返回数据中始终包含结构化的 JSON，同时保留原始描述以供前端回显。"

const USER_PROMPT = `
从下面要求的这几个维度，对图片的面部特征做评价，输出一个完整详细的表格，多用数据和客观的词描述，不要有句子，我要结果简洁精炼。用英文输出。以下是要求：

# 总体

总体评分（10分制）

- 眉毛
- 眼睛
- 嘴唇
- 鼻子

总体一句话评价，要给情绪价值（不超过20字）

# 具体维度

## 脸型

- 是什么脸型（圆脸/方脸/椭圆脸/心形脸/菱形脸）
- 不同脸型的可能性（百分比显示）
- 脸部特征
  - 苹果肌
  - 颧骨
  - 脸颊
  - 太阳穴
- 针对脸型的一些建议
- 脸部数据（百分比）
  - 眼间距离比率
  - 额头宽度比率
  - 嘴巴宽度比率
  - 鼻子宽度比率
  - 鼻子长度比率
  - 下巴宽度比率

## 得分

总体颜值打分

## 眼睛

- 眼睛的一句话评价，要给情绪价值（不超过20字）
- 眼型是什么
- 眼睛特征
  - 形状
  - 大小
  - 眼间距离
  - 对称性
- 眼部数据测量（mm)
  - 曲率
  - 平均高度
  - 平均宽度
  - 两眼距离
  - 左眼宽度
  - 右眼宽度
- 评分（10分制）
  - 总体
  - 形状
  - 大小
  - 眼距
  - 对称性

## 眉毛

- 眉毛的一句话评价，要给情绪价值（不超过20字）
- 眉毛形状
- 眉毛特征
  - 弧度
  - 形状
  - 距离
  - 对称性
  - 厚度
- 眉毛数据测量
  - 左侧宽度
  - 右侧宽度
  - 距离
  - 厚度
- 评分（10分制）
  - 弧度
  - 总体评分
  - 距离
  - 厚度

## 嘴唇

- 嘴唇的一句话评价，要给情绪价值（不超过20字）
- 嘴唇的形状
- 嘴唇特征
  - cupid_bow
  - 形状
  - 对称性
  - 厚度
  - 宽度
- 数据测量（mm）
  - 高度
  - 上嘴唇高度
  - 下嘴唇高度
  - 嘴唇宽度
- 评分（10分制）
  - cupid_bow
  - 总体评分
  - 比例
  - 形状
  - 厚度
  - 宽度

## 鼻子

- 鼻子的一句话评价，要给情绪价值（不超过20字）
- 鼻形
- 鼻子特征
  - 鼻梁
  - 鼻子宽度
  - 鼻子长度
  - 鼻子比例
  - 鼻子形状
- 数据测量（mm）
  - 鼻梁高度
  - 鼻梁宽度
  - 鼻子宽度
  - 鼻子长度
- 评分（10分制）
  - 鼻梁
  - 长度
  - 总体评分
  - 比率
  - 宽度

## 结构化结果

务必额外以 JSON 格式输出如下结构：

{
  "summary": {
    "overallScore": number,
    "overallComment": string,
    "featureRatings": { "Eyebrows": number, "Eyes": number, "Lips": number, "Nose": number }
  },
  "shape": {
    "faceShape": string,
    "description": string,
    "probabilities": Record<string, number>,
    "facialMeasurements": Record<string, string>,
    "recommendations": string[]
  },
  "eyes": {
    "overallComment": string,
    "shape": string,
    "measurements": Record<string, string>,
    "scores": Record<string, number>
  },
  "brows": {
    "overallComment": string,
    "shape": string,
    "measurements": Record<string, string>,
    "scores": Record<string, number>
  },
  "lips": {
    "overallComment": string,
    "shape": string,
    "measurements": Record<string, string>,
    "scores": Record<string, number>
  },
  "nose": {
    "overallComment": string,
    "shape": string,
    "measurements": Record<string, string>,
    "scores": Record<string, number>
  },
  "raw": string
}

在 JSON 外仍保留简单描述，避免额外解释，轻描淡写地陈列要点即可。结果用英文输出，不要有中文`

function extractMessageContent(choice: any): string {
  const content = choice?.message?.content
  if (!content) return ""

  if (typeof content === "string") {
    return content
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (!item) return ""
        if (typeof item === "string") {
          return item
        }
        return item.text ?? item.content ?? ""
      })
      .join("\n")
  }

  return ""
}

function extractJsonFromText(text: string): Record<string, any> | null {
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start === -1 || end === -1 || end <= start) return null

  const candidate = text.slice(start, end + 1)
  try {
    return JSON.parse(candidate)
  } catch (error) {
    return null
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const image = body?.image

  if (!image) {
    return NextResponse.json({ error: "Missing image data" }, { status: 400 })
  }

  let imageUrl: string
  try {
    imageUrl = await uploadToCos(image)
  } catch (error) {
    console.error("COS upload failed", error)
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 })
  }

  const apiKey = process.env.ARK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Server missing ARK_API_KEY" }, { status: 500 })
  }

  const payload = {
    model: MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
            detail: "low"
          },
          {
            type: "text",
            text: USER_PROMPT,
          },
        ],
      },
    ],
    temperature: 0.3,
    max_tokens: 2500,
    thinking: {
      "type": "disabled"
    }
  }

  const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "")
    return NextResponse.json(
      { error: "Remote API error", details: errorBody || `${response.status}` },
      { status: response.status }
    )
  }

  const data = await response.json()
  const choice = data?.choices?.[0]
  const rawContent = extractMessageContent(choice)
  const parsed = extractJsonFromText(rawContent)

  return NextResponse.json({
    raw: rawContent,
    parsed,
    imageUrl,
  })
}

type ParsedDataUri = {
  mime: string
  buffer: Buffer
  extension: string
}

let cosClient: COS | null = null

function ensureCosClient(): COS {
  if (cosClient) return cosClient

  const secretId = process.env.COS_SECRET_ID
  const secretKey = process.env.COS_SECRET_KEY
  const region = process.env.COS_REGION
  const bucket = process.env.COS_BUCKET

  if (!secretId || !secretKey || !region || !bucket) {
    throw new Error("COS configuration is missing. Please set COS_SECRET_ID, COS_SECRET_KEY, COS_REGION, COS_BUCKET.")
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const COSConstructor = require("cos-nodejs-sdk-v5") as typeof COS
  cosClient = new COSConstructor({
    SecretId: secretId,
    SecretKey: secretKey,
  })

  return cosClient
}

function parseDataUri(dataUri: string): ParsedDataUri {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUri)
  const mime = match?.[1]
  const data = match?.[2]

  if (!mime || !data) {
    throw new Error("Invalid image data")
  }

  const buffer = Buffer.from(data, "base64")
  const extension = mime.split("/")[1] || "jpg"

  return { mime, buffer, extension }
}

async function uploadToCos(image: string): Promise<string> {
  // If the client already sent an URL, reuse it.
  if (!image.startsWith("data:")) {
    return image
  }

  const { mime, buffer, extension } = parseDataUri(image)

  const secretId = process.env.COS_SECRET_ID
  const secretKey = process.env.COS_SECRET_KEY
  const region = process.env.COS_REGION
  const bucket = process.env.COS_BUCKET

  if (!secretId || !secretKey || !region || !bucket) {
    throw new Error("COS configuration is missing. Please set COS_SECRET_ID, COS_SECRET_KEY, COS_REGION, COS_BUCKET.")
  }

  const key = `uploads/${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`
  const cos = ensureCosClient()

  await cos.putObject({
    Bucket: bucket,
    Region: region,
    Key: key,
    Body: buffer,
    ContentLength: buffer.length,
    ContentType: mime,
    CacheControl: "max-age=31536000",
    ACL: "public-read",
  })

  return `https://${bucket}.cos.${region}.myqcloud.com/${key}`
}
