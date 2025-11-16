'use client';

import { useState } from 'react';
import { MoreHorizontal, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { CrudLayout } from '@/components/common/crud-layout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/data-table';
import { DeleteDialog } from '@/components/common/delete-dialog';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';
import { usePermission } from '@/hooks/use-permissions';
import { collections as collectionsData, Collection } from '@/data/collections';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(collectionsData);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const canCreate = usePermission(Module.COLLECTIONS, Permission.CREATE);
  const canUpdate = usePermission(Module.COLLECTIONS, Permission.UPDATE);
  const canDelete = usePermission(Module.COLLECTIONS, Permission.DELETE);

  const handleDelete = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: 'title',
      header: 'Name',
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
    },
    {
      accessorKey: 'description',
      header: 'Description',
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
          {row.original.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const collection = row.original;
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
              <DropdownMenuItem asChild>
                <Link href={`/collections/${collection.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {canUpdate && (
                <DropdownMenuItem asChild>
                  <Link href={`/collections/edit/${collection.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
              )}
              {canDelete && (
                <DropdownMenuItem onClick={() => setDeleteId(collection.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <PermissionGuard module={Module.COLLECTIONS} permission={Permission.VIEW}>
      <CrudLayout
        title="Collections"
        description="Manage product collections and featured groups"
        actionButton={
          canCreate ? (
            <Button asChild>
              <Link href="/collections/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Collection
              </Link>
            </Button>
          ) : undefined
        }
      >
        <DataTable columns={columns} data={collections} searchKey="title" />
      </CrudLayout>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Collection"
        description="Are you sure you want to delete this collection? This action cannot be undone."
      />
    </PermissionGuard>
  );
}

