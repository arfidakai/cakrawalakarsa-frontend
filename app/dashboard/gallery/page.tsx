'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DeleteConfirmDialog } from '@/components/dashboard/DeleteConfirmDialog'
import { Plus, Search, Trash2, Upload, X } from 'lucide-react'
import { galleryStorage, fileToBase64, type GalleryItem } from '@/lib/storage'

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImages, setSelectedImages] = useState<number[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [uploadForm, setUploadForm] = useState({
    title: '',
    files: [] as File[],
  })

  useEffect(() => {
    setGallery(galleryStorage.getAll())
  }, [])

  const filteredGallery = gallery.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleImageSelection = (id: number) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDelete = async () => {
    setDeleting(true)
    const success = galleryStorage.delete(selectedImages)
    
    if (success) {
      setGallery(galleryStorage.getAll())
      setSelectedImages([])
    }
    
    setDeleting(false)
    setShowDeleteDialog(false)
  }

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadForm({
        ...uploadForm,
        files: Array.from(e.target.files),
      })
    }
  }

  const handleUpload = async () => {
    if (uploadForm.files.length === 0) {
      alert('Please select at least one image')
      return
    }

    setUploading(true)

    try {
      for (const file of uploadForm.files) {
        const base64 = await fileToBase64(file)
        
        galleryStorage.create({
          url: base64,
          title: uploadForm.title || file.name.replace(/\.[^/.]+$/, ''),
          date: new Date().toISOString().split('T')[0],
        })
      }

      setGallery(galleryStorage.getAll())
      setShowUploadDialog(false)
      setUploadForm({ title: '', files: [] })
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 mt-1">Manage all gallery images</p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)}>
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
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
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

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
            <DialogDescription>
              Upload one or multiple images to the gallery
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                placeholder="Enter title for all images..."
                value={uploadForm.title}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, title: e.target.value })
                }
              />
              <p className="text-xs text-gray-500">
                If empty, file names will be used
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Select Images</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
              />
              {uploadForm.files.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium">
                    {uploadForm.files.length} file(s) selected:
                  </p>
                  {uploadForm.files.map((file, index) => (
                    <p key={index} className="text-xs text-gray-600">
                      • {file.name}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowUploadDialog(false)
                  setUploadForm({ title: '', files: [] })
                }}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Selected Images"
        description={`Are you sure you want to delete ${selectedImages.length} image(s)? This action cannot be undone.`}
      />
    </div>
  )
}