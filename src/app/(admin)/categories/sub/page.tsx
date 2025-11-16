'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/data-table';
import { DeleteDialog } from '@/components/common/delete-dialog';
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories } from '@/data/categories';
import Link from 'next/link';

export default function SubCategoriesPage() {
  // Filter only subcategories (those with parentId)
  const subCategories = categories.filter(c => c.parentId !== null);
  const [subCats, setSubCats] = useState(subCategories);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSubCats(subCats.filter(c => c.id !== id));
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Sub Category Name',
      cell: ({ row }: any) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }: any) => (
        <div className="text-muted-foreground text-sm">{row.original.slug}</div>
      ),
    },
    {
      accessorKey: 'parentId',
      header: 'Parent Category',
      cell: ({ row }: any) => {
        const parent = categories.find(c => c.id === row.original.parentId);
        return parent ? (
          <Badge variant="outline">{parent.name}</Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
    {
      accessorKey: 'productCount',
      header: 'Products',
      cell: ({ row }: any) => (
        <Badge variant="secondary">{row.original.productCount} products</Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }: any) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteId(category.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sub Categories</h1>
          <p className="text-muted-foreground">Manage product sub categories</p>
        </div>
        <Button asChild>
          <Link href="/categories/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Sub Category
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Sub Categories</CardDescription>
            <CardTitle className="text-3xl">{subCats.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {subCats.filter(c => c.status === 'active').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-3xl">
              {subCats.reduce((sum, c) => sum + c.productCount, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Sub Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sub Category List</CardTitle>
          <CardDescription>All sub categories and their parent categories</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={subCats} searchKey="name" />
        </CardContent>
      </Card>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Sub Category"
        description="Are you sure you want to delete this sub category?"
      />
    </div>
  );
}
