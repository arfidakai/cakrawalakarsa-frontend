'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ImageUpload } from '@/components/dashboard/ImageUpload'
import { leadershipStorage, fileToBase64, type LeaderItem } from '@/lib/storage'

export default function EditLeadershipPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  
  const [loading, setLoading] = useState(false)
  const [leader, setLeader] = useState<LeaderItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    bio: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [currentImage, setCurrentImage] = useState('')

  useEffect(() => {
    const leaders = leadershipStorage.getAll()
    const foundLeader = leaders.find((l) => l.id === id)
    
    if (foundLeader) {
      setLeader(foundLeader)
      setFormData({
        name: foundLeader.name,
        position: foundLeader.position,
        email: foundLeader.email || '',
        phone: foundLeader.phone || '',
        bio: foundLeader.bio || '',
      })
      setCurrentImage(foundLeader.image)
    } else {
      router.push('/dashboard/leadership')
    }
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.position) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      let imageBase64 = currentImage

      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile)
      }

      const success = leadershipStorage.update(id, {
        name: formData.name,
        position: formData.position,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        image: imageBase64,
      })

      if (success) {
        router.push('/dashboard/leadership')
      } else {
        alert('Failed to update leader')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error updating leader:', error)
      alert('Failed to update leader')
      setLoading(false)
    }
  }

  if (!leader) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/leadership">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Leader</h1>
          <p className="text-gray-500 mt-1">Update leadership profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">
                  Position <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  placeholder="e.g., Ketua, Wakil Ketua"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Short bio or description..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Photo <span className="text-red-500">*</span>
              </Label>
              <ImageUpload
                value={imageFile ? URL.createObjectURL(imageFile) : currentImage}
                onChange={setImageFile}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Link href="/dashboard/leadership">
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Leader'}
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  )
}
