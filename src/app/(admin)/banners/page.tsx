'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';
import { TableActions } from '@/components/common/table-actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGetBanners, Banner } from '@/queries/banners/useGetBanners.query';

export default function BannersPage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useGetBanners({ page, limit: 10 });

  const banners = data?.data || [];

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
      header: 'Image',
      cell: ({ row }) => {
        const image = row.getValue('image') as string;
        return (
          <div className="relative h-10 w-20 rounded-md overflow-hidden bg-gray-100">
            {image ? (
              <Image src={image} alt={row.getValue('title') as string} fill className="object-cover" sizes="80px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No image</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'click_count',
      header: 'Clicks',
      cell: ({ row }) => <div className="text-center">{row.getValue('click_count')}</div>,
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
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const banner = row.original;
        return (
          <TableActions
            onView={() => router.push(`/banners/${banner.banner_id}`)}
            onEdit={() => router.push(`/banners/${banner.banner_id}/edit`)}
            viewLabel="View Details"
            editLabel="Edit Banner"
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Banners" description="Manage homepage banners" addNewLabel="Add Banner" addNewHref="/banners/add" />
        <div className="text-center py-10 text-red-500">Error loading banners. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Banners" description="Manage homepage banners" addNewLabel="Add Banner" addNewHref="/banners/add" />
      <DataTable columns={columns} data={banners} searchKey="title" searchPlaceholder="Search banners..." isLoading={isLoading} />
    </div>
  );
}
