'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { divisionsApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

interface Division {
  id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
}

export default function DivisionsListPage() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    try {
      const data = await divisionsApi.getAll();
      setDivisions(data);
    } catch (error) {
      console.error('Failed to fetch divisions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await divisionsApi.delete(deleteId);
      setDivisions(divisions.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete division:', error);
      alert('Failed to delete division');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Divisions Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage organizational divisions
          </p>
        </div>
        <Link href="/admin/divisions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Division
          </Button>
        </Link>
      </div>

      {/* Divisions Table */}
      <div className="rounded-lg border bg-white">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : divisions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No divisions yet. Create your first one!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {divisions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="max-w-md truncate">{item.description}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/divisions/${item.id}`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this division.
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
