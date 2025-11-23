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
import { useGetBrands, Brand } from '@/queries/brands/useGetBrands.query';

export default function BrandsPage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useGetBrands({ page, limit: 10 });

  const brands = data?.data || [];

  const columns: ColumnDef<Brand>[] = [
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
      accessorKey: 'logo',
      header: 'Logo',
      cell: ({ row }) => {
        const logo = row.getValue('logo') as string;
        return (
          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
            {logo ? (
              <Image src={logo} alt={row.getValue('name') as string} fill className="object-cover" sizes="40px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No logo</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'product_count',
      header: 'Products',
      cell: ({ row }) => <div className="text-center">{row.getValue('product_count')}</div>,
    },
    {
      accessorKey: 'featured',
      header: 'Featured',
      cell: ({ row }) => {
        const featured = row.getValue('featured') as boolean;
        return featured ? <Badge variant="outline">⭐ Featured</Badge> : null;
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
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const brand = row.original;
        return (
          <TableActions
            onView={() => router.push(`/brands/${brand.brand_id}`)}
            onEdit={() => router.push(`/brands/${brand.brand_id}/edit`)}
            viewLabel="View Details"
            editLabel="Edit Brand"
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Brands" description="Manage product brands" addNewLabel="Add Brand" addNewHref="/brands/add" />
        <div className="text-center py-10 text-red-500">Error loading brands. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Brands" description="Manage product brands" addNewLabel="Add Brand" addNewHref="/brands/add" />
      <DataTable columns={columns} data={brands} searchKey="name" searchPlaceholder="Search brands..." isLoading={isLoading} />
    </div>
  );
}
