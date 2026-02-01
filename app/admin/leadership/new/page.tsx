'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { leadershipApi } from '@/lib/api';
import { uploadImage, validateImageFile } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewLeadershipPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photo: '',
    bio: '',
    order: 0,
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const error = validateImageFile(file);
    if (error) {
      alert(error);
      return;
    }

    setUploading(true);
    try {
      // Upload to Supabase Storage
      const photoUrl = await uploadImage(file, 'images', 'leadership');
      setFormData({ ...formData, photo: photoUrl });
      
      // Show preview
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
      await leadershipApi.create(formData);
      router.push('/admin/leadership');
    } catch (error) {
      console.error('Failed to create leadership member:', error);
      alert('Failed to create leadership member');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/leadership">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Leadership Member</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new member to the leadership team
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
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
                  placeholder="Enter member name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  placeholder="e.g., President, Vice President"
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
                <p className="text-sm text-gray-500">
                  Lower numbers appear first
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Photo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  {uploading && (
                    <span className="text-sm text-gray-500">Uploading...</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter member biography..."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || uploading}>
                  {loading ? 'Creating...' : 'Create Member'}
                </Button>
                <Link href="/admin/leadership">
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
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(imagePreview || formData.photo) && (
                <div className="aspect-square relative overflow-hidden rounded-lg border bg-gray-100">
                  <img
                    src={imagePreview || formData.photo}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {!imagePreview && !formData.photo && (
                <div className="aspect-square flex flex-col items-center justify-center rounded-lg border bg-gray-50 text-gray-400">
                  <Upload className="h-12 w-12 mb-2" />
                  <span className="text-sm">No photo uploaded</span>
                </div>
              )}
              {formData.name && (
                <div>
                  <h3 className="font-bold text-lg">{formData.name}</h3>
                  <p className="text-sm text-gray-600">{formData.position}</p>
                  {formData.bio && (
                    <p className="text-sm text-gray-500 mt-2">{formData.bio}</p>
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
