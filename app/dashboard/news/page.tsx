'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { DeleteConfirmDialog } from '@/components/dashboard/DeleteConfirmDialog'
import { Plus, Search, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'
import { newsStorage, type NewsItem } from '@/lib/storage'

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    // Load news from storage
    setNews(newsStorage.getAll())
  }, [])

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async () => {
    if (!deleteId) return
    
    setDeleting(true)
    const success = newsStorage.delete(deleteId)
    
    if (success) {
      setNews(newsStorage.getAll())
    }
    
    setDeleting(false)
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-500 mt-1">Manage all news articles</p>
        </div>
        <Link href="/dashboard/news/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add News
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.map((news) => (
              <TableRow key={news.id}>
                <TableCell className="font-medium">{news.title}</TableCell>
                <TableCell>{news.author}</TableCell>
                <TableCell>{news.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={news.status === 'published' ? 'default' : 'secondary'}
                  >
                    {news.status}
                  </Badge>
                </TableCell>
                <TableCell>{news.views}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <Link href={`/dashboard/news/${news.id}/edit`}>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => setDeleteId(news.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete News Article"
        description="Are you sure you want to delete this news article? This action cannot be undone."
      />
    </div>
  )
}