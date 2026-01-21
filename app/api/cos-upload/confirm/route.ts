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
  const key: string | undefined = body?.key

  const region = process.env.COS_REGION
  const bucket = process.env.COS_BUCKET

  if (!region || !bucket) {
    return NextResponse.json(
      { error: "COS configuration is missing. Please set COS_SECRET_ID, COS_SECRET_KEY, COS_REGION, COS_BUCKET." },
      { status: 500 }
    )
  }

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 })
  }

  try {
    const cos = ensureCosClient()
    await cos.putObjectAcl({
      Bucket: bucket,
      Region: region,
      Key: key,
      ACL: "public-read",
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Failed to set COS ACL", error)
    return NextResponse.json({ error: "Failed to set COS ACL" }, { status: 500 })
  }
}
