import { NextResponse } from "next/server"
import type COS from "cos-nodejs-sdk-v5"

export const runtime = "nodejs"

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

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const contentType: string = body?.contentType || "application/octet-stream"
  const extension: string | undefined = body?.extension

  const region = process.env.COS_REGION
  const bucket = process.env.COS_BUCKET

  if (!region || !bucket) {
    return NextResponse.json(
      { error: "COS configuration is missing. Please set COS_SECRET_ID, COS_SECRET_KEY, COS_REGION, COS_BUCKET." },
      { status: 500 }
    )
  }

  const ext = (extension || contentType.split("/")[1] || "bin").toLowerCase()
  const key = `uploads/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`

  try {
    const cos = ensureCosClient()
    const uploadUrl = cos.getObjectUrl({
      Bucket: bucket,
      Region: region,
      Key: key,
      Sign: true,
      Method: "PUT",
      Expires: 600,
    })

    const fileUrl = `https://${bucket}.cos.${region}.myqcloud.com/${key}`

    return NextResponse.json({
      uploadUrl,
      fileUrl,
      key,
      headers: {
        "Content-Type": contentType,
      },
    })
  } catch (error) {
    console.error("Failed to create COS upload URL", error)
    return NextResponse.json({ error: "Failed to create COS upload URL" }, { status: 500 })
  }
}
