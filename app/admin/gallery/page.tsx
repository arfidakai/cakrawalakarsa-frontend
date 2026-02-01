'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { galleryApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category?: string;
  createdAt?: string;
}

export default function GalleryListPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const data = await galleryApi.getAll();
      setGallery(data);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await galleryApi.delete(deleteId);
      setGallery(gallery.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
      alert('Failed to delete gallery item');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all gallery images
          </p>
        </div>
        <Link href="/admin/gallery/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </Link>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="p-8 text-center">Loading...</div>
      ) : gallery.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
          No gallery items yet. Upload your first image!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="aspect-square relative bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">
                  {item.title}
                </h3>
                {item.category && (
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/gallery/${item.id}`}>
                  <Button variant="secondary" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDeleteId(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the gallery item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
