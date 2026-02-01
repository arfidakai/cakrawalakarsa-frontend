import { supabase } from './supabase';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'images')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = 'images',
  folder?: string
): Promise<string> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    
    // Construct file path
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Upload image error:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name (default: 'images')
 */
export async function deleteImage(
  url: string,
  bucket: string = 'images'
): Promise<void> {
  try {
    // Extract file path from URL
    const urlParts = url.split(`${bucket}/`);
    if (urlParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    
    const filePath = urlParts[1];

    // Delete file
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  } catch (error) {
    console.error('Delete image error:', error);
    // Don't throw error for delete failures to prevent blocking operations
  }
}

/**
 * Validate image file
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 * @returns Error message if invalid, null if valid
 */
export function validateImageFile(file: File, maxSizeMB: number = 5): string | null {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)';
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `Image size must be less than ${maxSizeMB}MB`;
  }

  return null;
}
