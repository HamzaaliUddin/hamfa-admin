'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';
import { TableActions } from '@/components/common/table-actions';
import { DeleteDialog } from '@/components/common/delete-dialog';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { banners as bannersData, Banner } from '@/data/banners';

export default function BannersPage() {
  const router = useRouter();
  const [banners, setBanners] = React.useState<Banner[]>(bannersData);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    setTimeout(() => {
      setBanners(banners.filter((b) => b.id !== deleteId));
      setIsDeleting(false);
      setDeleteId(null);
    }, 1000);
  };

  const columns: ColumnDef<Banner>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'image',
      header: 'Preview',
      cell: ({ row }) => {
        const image = row.getValue('image') as string;
        return (
          <div className="relative h-12 w-20 rounded-md overflow-hidden bg-gray-100">
            <Image
              src={image}
              alt={row.getValue('title')}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'position',
      header: 'Position',
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue('position')}</Badge>
      ),
    },
    {
      accessorKey: 'order',
      header: 'Order',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('order')}</div>
      ),
    },
    {
      accessorKey: 'expiresAt',
      header: 'Expires',
      cell: ({ row }) => {
        const expiresAt = row.getValue('expiresAt') as string | undefined;
        if (!expiresAt) return <span className="text-muted-foreground text-sm">—</span>;
        
        const date = new Date(expiresAt);
        const isExpired = date < new Date();
        
        return (
          <div className={isExpired ? 'text-destructive' : ''}>
            {date.toLocaleDateString('en-IN')}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return date.toLocaleDateString('en-IN');
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const banner = row.original;

        return (
          <TableActions
            onView={() => router.push(`/banners/${banner.id}`)}
            onEdit={() => router.push(`/banners/${banner.id}/edit`)}
            onDelete={() => setDeleteId(banner.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banners"
        description="Manage homepage and promotional banners"
        addNewLabel="Add Banner"
        addNewHref="/banners/add"
      />

      <DataTable 
        columns={columns} 
        data={banners} 
        searchKey="title" 
        searchPlaceholder="Search banners..." 
      />

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Banner"
        description="Are you sure you want to delete this banner?"
        isLoading={isDeleting}
      />
    </div>
  );
}
