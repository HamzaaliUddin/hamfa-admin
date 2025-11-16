'use client';

import { useState } from 'react';
import { MoreHorizontal, Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
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
import { terms as termsData, Term } from '@/data/terms';

export default function TermsPage() {
  const [terms, setTerms] = useState<Term[]>(termsData);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const canCreate = usePermission(Module.TERMS, Permission.CREATE);
  const canUpdate = usePermission(Module.TERMS, Permission.UPDATE);
  const canDelete = usePermission(Module.TERMS, Permission.DELETE);

  const handleDelete = (id: string) => {
    setTerms(terms.filter(t => t.id !== id));
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.original.title}</span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }: any) => {
        const typeLabels: Record<string, string> = {
          terms: 'Terms & Conditions',
          privacy: 'Privacy Policy',
          refund: 'Refund Policy',
          shipping: 'Shipping Policy',
        };
        return <Badge variant="outline">{typeLabels[row.original.type]}</Badge>;
      },
    },
    {
      accessorKey: 'version',
      header: 'Version',
      cell: ({ row }: any) => <Badge variant="secondary">v{row.original.version}</Badge>,
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
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: ({ row }: any) => new Date(row.original.updatedAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const term = row.original;
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
                <Link href={`/terms/${term.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {canUpdate && (
                <DropdownMenuItem asChild>
                  <Link href={`/terms/edit/${term.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
              )}
              {canDelete && (
                <DropdownMenuItem onClick={() => setDeleteId(term.id)}>
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
    <PermissionGuard module={Module.TERMS} permission={Permission.VIEW}>
      <CrudLayout
        title="Terms & Conditions"
        description="Manage legal documents and policies"
        actionButton={
          canCreate ? (
            <Button asChild>
              <Link href="/terms/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Terms
              </Link>
            </Button>
          ) : undefined
        }
      >
        <DataTable columns={columns} data={terms} searchKey="title" />
      </CrudLayout>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Terms"
        description="Are you sure you want to delete this document? This action cannot be undone."
      />
    </PermissionGuard>
  );
}

