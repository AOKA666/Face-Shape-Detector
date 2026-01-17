"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Upload, ImageIcon, X } from "lucide-react"

export function Hero() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const clearImage = useCallback(() => {
    setUploadedImage(null)
  }, [])

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <h1 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block text-white">AI Face Shape Detector</span>
            <span className="mt-2 block text-lg font-medium text-white/70 sm:text-xl md:text-2xl">
              Free Online Face Shape Analyzer from Photo
            </span>
          </h1>

          <h2 className="mt-10 text-center text-xl font-semibold text-lime-300 sm:text-2xl">
            Upload Your Photo to Detect Your Face Shape
          </h2>

          <div className="mt-8 grid w-full max-w-4xl gap-6 md:grid-cols-2">
            <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 p-4 backdrop-blur-sm">
              <h3 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-lime-300/80">
                Upload Image (JPG, PNG, WebP)
              </h3>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
                  isDragging
                    ? "border-lime-400 bg-lime-400/10"
                    : "border-white/20 bg-neutral-800/50 hover:border-lime-400/50"
                }`}
              >
                {uploadedImage ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                      <Image src={uploadedImage || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                    <p className="text-sm text-lime-300">Image uploaded!</p>
                    <Button
                      onClick={clearImage}
                      variant="outline"
                      size="sm"
                      className="border-white/20 bg-transparent text-white hover:bg-white/10"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear & Upload New
                    </Button>
                  </div>
                ) : (
                  <label className="flex h-full cursor-pointer flex-col items-center justify-center text-white/60 transition-colors hover:text-white/80">
                    <Upload className="mb-3 h-12 w-12" />
                    <p className="mb-2 text-sm font-medium">Drag & drop your photo here</p>
                    <p className="mb-4 text-xs text-white/40">or click to browse</p>
                    <Button asChild className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300">
                      <span>Select Image</span>
                    </Button>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 p-4 backdrop-blur-sm">
              <h3 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-lime-300/80">
                Detect Face Shape Instantly with AI
              </h3>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-800/50">
                {uploadedImage ? (
                  <>
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded face for analysis"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/70 p-3 backdrop-blur-sm">
                      <p className="text-center text-sm text-white/80">Analyzing face shape...</p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-white/40">
                    <ImageIcon className="mb-3 h-16 w-16" />
                    <p className="text-sm">Upload an image to see results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
