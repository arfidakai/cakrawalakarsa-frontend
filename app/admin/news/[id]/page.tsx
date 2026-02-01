'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { newsApi } from '@/lib/api';
import { uploadImage, validateImageFile, deleteImage } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditNewsPage() {
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
    content: '',
    date: '',
    image: '',
  });

  useEffect(() => {
    if (id) {
      fetchNews();
    }
  }, [id]);

  const fetchNews = async () => {
    try {
      const data = await newsApi.getById(id);
      setFormData({
        title: data.title || '',
        content: data.content || '',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        image: data.image || '',
      });
      setOldImageUrl(data.image || '');
    } catch (error) {
      console.error('Failed to fetch news:', error);
      alert('Failed to load news article');
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
      const imageUrl = await uploadImage(file, 'images', 'news');
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
      await newsApi.update(id, formData);
      
      if (oldImageUrl && formData.image !== oldImageUrl) {
        await deleteImage(oldImageUrl);
      }
      
      router.push('/admin/news');
    } catch (error) {
      console.error('Failed to update news:', error);
      alert('Failed to update news article');
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
        <Link href="/admin/news">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit News Article</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update the news article information
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
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
                placeholder="Enter article title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
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
              {(imagePreview || formData.image) && (
                <div className="mt-2">
                  <img src={imagePreview || formData.image} alt="Preview" className="max-h-40 rounded border" />
                </div>
              )}
              <p className="text-sm text-gray-500">
                Leave empty to keep current image
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={10}
                placeholder="Enter article content..."
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading || uploading}>
                {loading ? 'Updating...' : 'Update Article'}
              </Button>
              <Link href="/admin/news">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
