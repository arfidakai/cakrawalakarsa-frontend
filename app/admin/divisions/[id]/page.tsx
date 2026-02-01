'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { divisionsApi } from '@/lib/api';
import { uploadImage, validateImageFile, deleteImage } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function EditDivisionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [iconPreview, setIconPreview] = useState<string>('');
  const [oldIconUrl, setOldIconUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    order: 0,
  });

  useEffect(() => {
    if (id) {
      fetchDivision();
    }
  }, [id]);

  const fetchDivision = async () => {
    try {
      const data = await divisionsApi.getById(id);
      setFormData({
        name: data.name || '',
        description: data.description || '',
        icon: data.icon || '',
        order: data.order || 0,
      });
      setOldIconUrl(data.icon || '');
    } catch (error) {
      console.error('Failed to fetch division:', error);
      alert('Failed to load division');
    } finally {
      setFetching(false);
    }
  };

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      alert(error);
      return;
    }

    setUploading(true);
    try {
      const iconUrl = await uploadImage(file, 'images', 'divisions');
      setFormData({ ...formData, icon: iconUrl });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to upload icon:', error);
      alert('Failed to upload icon');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await divisionsApi.update(id, formData);
      
      if (oldIconUrl && formData.icon !== oldIconUrl) {
        await deleteImage(oldIconUrl);
      }
      
      router.push('/admin/divisions');
    } catch (error) {
      console.error('Failed to update division:', error);
      alert('Failed to update division');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.name === 'order' ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
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
      <div className="flex items-center gap-4">
        <Link href="/admin/divisions">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Division</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update division information
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Division Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter division name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon/Logo</Label>
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  disabled={uploading}
                  className="cursor-pointer"
                />
                {uploading && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Enter division description..."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || uploading}>
                  {loading ? 'Updating...' : 'Update Division'}
                </Button>
                <Link href="/admin/divisions">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(iconPreview || formData.icon) ? (
                <div className="w-32 h-32 relative overflow-hidden rounded-lg border bg-gray-100 mx-auto">
                  <img
                    src={iconPreview || formData.icon}
                    alt="Preview"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 flex flex-col items-center justify-center rounded-lg border bg-gray-50 text-gray-400 mx-auto">
                  <Upload className="h-8 w-8 mb-1" />
                  <span className="text-xs">No icon</span>
                </div>
              )}
              {formData.name && (
                <div className="text-center">
                  <h3 className="font-bold text-lg">{formData.name}</h3>
                  {formData.description && (
                    <p className="text-sm text-gray-600 mt-2">{formData.description}</p>
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
