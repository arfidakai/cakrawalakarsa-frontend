'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { leadershipApi } from '@/lib/api';
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

interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  photo?: string;
  bio?: string;
  order: number;
}

export default function LeadershipListPage() {
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      const data = await leadershipApi.getAll();
      setLeadership(data);
    } catch (error) {
      console.error('Failed to fetch leadership:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await leadershipApi.delete(deleteId);
      setLeadership(leadership.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete leadership member:', error);
      alert('Failed to delete leadership member');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leadership Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage leadership team members
          </p>
        </div>
        <Link href="/admin/leadership/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </Link>
      </div>

      {/* Leadership Table */}
      <div className="rounded-lg border bg-white">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : leadership.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No leadership members yet. Create your first one!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadership.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/leadership/${item.id}`}>
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
              This action cannot be undone. This will permanently delete this leadership member.
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
