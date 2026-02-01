'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/dashboard/ImageUpload'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { newsStorage, fileToBase64 } from '@/lib/storage'

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft' as 'draft' | 'published',
    image: null as File | null,
    currentImage: '',
  })

  useEffect(() => {
    const newsId = parseInt(params.id)
    const news = newsStorage.getById(newsId)
    
    if (news) {
      setFormData({
        title: news.title,
        content: news.content,
        status: news.status,
        image: null,
        currentImage: news.image || '',
      })
    }
    setLoading(false)
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      let imageBase64 = formData.currentImage
      
      if (formData.image) {
        imageBase64 = await fileToBase64(formData.image)
      }

      newsStorage.update(parseInt(params.id), {
        title: formData.title,
        content: formData.content,
        status: formData.status,
        image: imageBase64,
      })

      router.push('/dashboard/news')
    } catch (error) {
      console.error('Error updating news:', error)
      alert('Failed to update news')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/news">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit News</h1>
          <p className="text-gray-500 mt-1">Update news article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write your article content here..."
                    rows={12}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'draft' | 'published') =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.currentImage}
                  onChange={(file) => setFormData({ ...formData, image: file })}
                />
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Link href="/dashboard/news" className="flex-1">
                <Button type="button" variant="outline" className="w-full" disabled={saving}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="flex-1" disabled={saving}>
                {saving ? 'Saving...' : 'Update'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
