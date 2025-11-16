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
import { brands as brandsData, Brand } from '@/data/brands';

export default function BrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = React.useState<Brand[]>(brandsData);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    setTimeout(() => {
      setBrands(brands.filter((b) => b.id !== deleteId));
      setIsDeleting(false);
      setDeleteId(null);
    }, 1000);
  };

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
        const logo = row.getValue('logo') as string | undefined;
        return (
          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
            {logo ? (
              <Image
                src={logo}
                alt={row.getValue('name')}
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                No logo
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Brand Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue('slug')}</div>
      ),
    },
    {
      accessorKey: 'productCount',
      header: 'Products',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('productCount')}</div>
      ),
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
        const brand = row.original;

        return (
          <TableActions
            onView={() => router.push(`/brands/${brand.id}`)}
            onEdit={() => router.push(`/brands/${brand.id}/edit`)}
            onDelete={() => setDeleteId(brand.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brands"
        description="Manage product brands"
        addNewLabel="Add Brand"
        addNewHref="/brands/add"
      />

      <DataTable 
        columns={columns} 
        data={brands} 
        searchKey="name" 
        searchPlaceholder="Search brands..." 
      />

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Brand"
        description="Are you sure you want to delete this brand? All associated products will need to be reassigned."
        isLoading={isDeleting}
      />
    </div>
  );
}
