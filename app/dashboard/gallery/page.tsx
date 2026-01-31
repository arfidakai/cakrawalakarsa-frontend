'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { DeleteConfirmDialog } from '@/components/dashboard/DeleteConfirmDialog'
import { Plus, Search, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'

const mockGallery = [
  {
    id: 1,
    url: '/images/event1.jpg',
    title: 'Workshop 2026',
    date: '2026-01-20',
  },
  {
    id: 2,
    url: '/images/event2.jpg',
    title: 'Team Building',
    date: '2026-01-15',
  },
  {
    id: 3,
    url: '/images/event3.jpg',
    title: 'Annual Gathering',
    date: '2026-01-10',
  },
  {
    id: 4,
    url: '/images/event4.jpg',
    title: 'Seminar',
    date: '2026-01-05',
  },
  {
    id: 5,
    url: '/images/event5.jpg',
    title: 'Bakti Sosial',
    date: '2025-12-20',
  },
  {
    id: 6,
    url: '/images/event6.jpg',
    title: 'Rapat Divisi',
    date: '2025-12-15',
  },
]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImages, setSelectedImages] = useState<number[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const filteredGallery = mockGallery.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleImageSelection = (id: number) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDelete = async () => {
    setDeleting(true)
    setTimeout(() => {
      console.log('Deleting images:', selectedImages)
      setDeleting(false)
      setShowDeleteDialog(false)
      setSelectedImages([])
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 mt-1">Manage all gallery images</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Upload Images
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {selectedImages.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedImages.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedImages.includes(item.id)
                  ? 'ring-2 ring-blue-500'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => toggleImageSelection(item.id)}
            >
              <div className="aspect-square bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Upload className="w-12 h-12" />
                </div>
                {selectedImages.includes(item.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        loading={deleting}
        title={`Delete ${selectedImages.length} Image(s)`}
        description={`Are you sure you want to delete ${selectedImages.length} selected image(s)? This action cannot be undone.`}
      />
    </div>
  )
}