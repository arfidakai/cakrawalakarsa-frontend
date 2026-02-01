'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { galleryApi } from '@/lib/api';
import { uploadImage, validateImageFile, deleteImage } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [oldImageUrl, setOldImageUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    if (id) {
      fetchGalleryItem();
    }
  }, [id]);

  const fetchGalleryItem = async () => {
    try {
      const data = await galleryApi.getById(id);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        category: data.category || '',
      });
      setOldImageUrl(data.image || '');
    } catch (error) {
      console.error('Failed to fetch gallery item:', error);
      alert('Failed to load gallery item');
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      alert(error);
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file, 'images', 'gallery');
      setFormData({ ...formData, image: imageUrl });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await galleryApi.update(id, formData);
      
      if (oldImageUrl && formData.image !== oldImageUrl) {
        await deleteImage(oldImageUrl);
      }
      
      router.push('/admin/gallery');
    } catch (error) {
      console.error('Failed to update gallery item:', error);
      alert('Failed to update gallery item');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (fetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Gallery Item</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update the gallery item information
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Image Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter image title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Events, Activities"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                  className="cursor-pointer"
                />
                {uploading && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
                <p className="text-sm text-gray-500">
                  Leave empty to keep current image
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter image description..."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || uploading}>
                  {loading ? 'Updating...' : 'Update Gallery Item'}
                </Button>
                <Link href="/admin/gallery">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Image Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(imagePreview || formData.image) ? (
                <div className="aspect-square relative overflow-hidden rounded-lg border bg-gray-100">
                  <img
                    src={imagePreview || formData.image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square flex flex-col items-center justify-center rounded-lg border bg-gray-50 text-gray-400">
                  <Upload className="h-12 w-12 mb-2" />
                  <span className="text-sm">No image uploaded</span>
                </div>
              )}
              {formData.title && (
                <div>
                  <h3 className="font-medium">{formData.title}</h3>
                  {formData.category && (
                    <p className="text-sm text-gray-500 mt-1">{formData.category}</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
