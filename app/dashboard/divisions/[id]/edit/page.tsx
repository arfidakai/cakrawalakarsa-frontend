'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'
import { divisionsStorage, type DivisionItem } from '@/lib/storage'

export default function EditDivisionPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  
  const [loading, setLoading] = useState(false)
  const [division, setDivision] = useState<DivisionItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head: '',
    members: [''],
  })

  useEffect(() => {
    const divisions = divisionsStorage.getAll()
    const foundDivision = divisions.find((d) => d.id === id)
    
    if (foundDivision) {
      setDivision(foundDivision)
      setFormData({
        name: foundDivision.name,
        description: foundDivision.description,
        head: foundDivision.head,
        members: foundDivision.members.length > 0 ? foundDivision.members : [''],
      })
    } else {
      router.push('/dashboard/divisions')
    }
  }, [id, router])

  const handleAddMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, ''],
    })
  }

  const handleRemoveMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index),
    })
  }

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...formData.members]
    newMembers[index] = value
    setFormData({ ...formData, members: newMembers })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.head) {
      alert('Please fill in all required fields')
      return
    }

    const validMembers = formData.members.filter((m) => m.trim() !== '')
    
    if (validMembers.length === 0) {
      alert('Please add at least one member')
      return
    }

    setLoading(true)

    try {
      const success = divisionsStorage.update(id, {
        name: formData.name,
        description: formData.description,
        head: formData.head,
        members: validMembers,
      })

      if (success) {
        router.push('/dashboard/divisions')
      } else {
        alert('Failed to update division')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error updating division:', error)
      alert('Failed to update division')
      setLoading(false)
    }
  }

  if (!division) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/divisions">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Division</h1>
          <p className="text-gray-500 mt-1">Update division information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Division Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Divisi Humas, Divisi Keuangan"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of division responsibilities..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="head">
                Division Head <span className="text-red-500">*</span>
              </Label>
              <Input
                id="head"
                value={formData.head}
                onChange={(e) =>
                  setFormData({ ...formData, head: e.target.value })
                }
                placeholder="Name of division head"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>
                  Members <span className="text-red-500">*</span>
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddMember}
                >
                  Add Member
                </Button>
              </div>
              <div className="space-y-2">
                {formData.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={member}
                      onChange={(e) => handleMemberChange(index, e.target.value)}
                      placeholder={`Member ${index + 1} name`}
                    />
                    {formData.members.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMember(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Link href="/dashboard/divisions">
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Division'}
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  )
}
