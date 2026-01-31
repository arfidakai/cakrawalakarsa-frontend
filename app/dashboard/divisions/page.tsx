'use client'

import { useState } from 'react'
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
import { Plus, Search, MoreVertical, Edit, Trash2, Users } from 'lucide-react'


const mockDivisions = [
  {
    id: 1,
    name: 'Public Relations',
    description: 'Handle external communications and media',
    members: 12,
    head: 'Sarah Wilson',
  },
  {
    id: 2,
    name: 'Finance',
    description: 'Manage financial operations',
    members: 8,
    head: 'Michael Chen',
  },
  {
    id: 3,
    name: 'Human Resources',
    description: 'Employee management and development',
    members: 10,
    head: 'Emily Brown',
  },
  {
    id: 4,
    name: 'IT & Technology',
    description: 'Technical infrastructure and support',
    members: 15,
    head: 'David Lee',
  },
]

export default function DivisionsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDivisions = mockDivisions.filter((division) =>
    division.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Divisions Management</h1>
          <p className="text-gray-500 mt-1">Manage organizational divisions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Division
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search divisions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Division Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Head</TableHead>
              <TableHead>Members</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDivisions.map((division) => (
              <TableRow key={division.id}>
                <TableCell className="font-medium">{division.name}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {division.description}
                </TableCell>
                <TableCell>{division.head}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    {division.members}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="w-4 h-4 mr-2" />
                        View Members
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
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
    </div>
  )
}
