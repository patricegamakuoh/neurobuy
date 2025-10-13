'use client'

import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { uploadFile, validateFileType, validateFileSize, getPublicUrl, STORAGE_BUCKETS } from '../lib/storage'
import { auth } from '../lib/auth'

interface ImageUploadProps {
  bucket: keyof typeof STORAGE_BUCKETS
  onUploadComplete: (urls: string[]) => void
  onUploadError: (error: string) => void
  maxFiles?: number
  maxSizeInMB?: number
  allowedTypes?: string[]
  className?: string
}

export default function ImageUpload({
  bucket,
  onUploadComplete,
  onUploadError,
  maxFiles = 5,
  maxSizeInMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    
    // Validate file count
    if (fileArray.length > maxFiles) {
      onUploadError(`You can only upload up to ${maxFiles} files`)
      return
    }

    // Validate file types and sizes
    for (const file of fileArray) {
      if (!validateFileType(file, allowedTypes)) {
        onUploadError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`)
        return
      }
      
      if (!validateFileSize(file, maxSizeInMB)) {
        onUploadError(`File too large. Maximum size: ${maxSizeInMB}MB`)
        return
      }
    }

    setUploading(true)

    try {
      // Get current user
      const { user } = await auth.getCurrentUser()
      if (!user) {
        onUploadError('You must be logged in to upload images')
        return
      }

      const bucketName = STORAGE_BUCKETS[bucket]
      const uploadPromises = fileArray.map(async (file, index) => {
        const fileName = `${Date.now()}-${index}-${file.name}`
        const result = await uploadFile({
          bucket: bucketName,
          path: fileName,
          file,
          userId: user.id
        })

        if (result.error) {
          throw new Error(result.error.message)
        }

        return result.data?.fullPath || ''
      })

      const urls = await Promise.all(uploadPromises)
      const validUrls = urls.filter(url => url !== '')
      
      setUploadedImages(prev => [...prev, ...validUrls])
      onUploadComplete(validUrls)
    } catch (error) {
      onUploadError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="text-4xl opacity-50">📷</div>
          <div>
            <p className="text-lg font-medium">Drop images here</p>
            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose Images'}
          </Button>
          <p className="text-xs text-muted-foreground">
            Max {maxFiles} files, {maxSizeInMB}MB each. Allowed: {allowedTypes.join(', ')}
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={allowedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Images:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
