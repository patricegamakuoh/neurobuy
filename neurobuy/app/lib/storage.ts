import { supabase } from './supabase/client'

export interface UploadOptions {
  bucket: string
  path: string
  file: File
  userId?: string
}

export interface UploadResult {
  data: { path: string; fullPath: string } | null
  error: Error | null
}

// Upload file to Supabase Storage
export async function uploadFile({ bucket, path, file, userId }: UploadOptions): Promise<UploadResult> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') }
  }

  try {
    // Create the full path with user ID if provided
    const fullPath = userId ? `${userId}/${path}` : path

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Upload error:', error)
      return { data: null, error: new Error(error.message) }
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath)

    return {
      data: {
        path: fullPath,
        fullPath: urlData.publicUrl
      },
      error: null
    }
  } catch (error) {
    console.error('Upload error:', error)
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Upload failed') 
    }
  }
}

// Delete file from Supabase Storage
export async function deleteFile(bucket: string, path: string): Promise<{ error: Error | null }> {
  if (!supabase) {
    return { error: new Error('Supabase not configured') }
  }

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return { error: new Error(error.message) }
    }

    return { error: null }
  } catch (error) {
    console.error('Delete error:', error)
    return { 
      error: error instanceof Error ? error : new Error('Delete failed') 
    }
  }
}

// Get public URL for a file
export function getPublicUrl(bucket: string, path: string): string {
  if (!supabase) {
    return ''
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}

// Upload multiple files
export async function uploadMultipleFiles(
  bucket: string, 
  files: File[], 
  userId: string,
  basePath: string = 'images'
): Promise<{ paths: string[]; errors: Error[] }> {
  const paths: string[] = []
  const errors: Error[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileExtension = file.name.split('.').pop()
    const fileName = `${basePath}/${Date.now()}-${i}.${fileExtension}`

    const result = await uploadFile({
      bucket,
      path: fileName,
      file,
      userId
    })

    if (result.error) {
      errors.push(result.error)
    } else if (result.data) {
      paths.push(result.data.path)
    }
  }

  return { paths, errors }
}

// Storage bucket constants
export const STORAGE_BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  STORE_LOGOS: 'store-logos',
  USER_AVATARS: 'user-avatars'
} as const

// Helper function to validate file types
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

// Helper function to validate file size (in bytes)
export function validateFileSize(file: File, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

// Helper function to generate unique filename
export function generateFileName(originalName: string, userId: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}
