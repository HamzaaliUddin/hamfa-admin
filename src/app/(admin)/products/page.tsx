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
import { useGetProducts, Product } from '@/queries/products/useGetProducts.query';
import { useDeleteProduct } from '@/queries/products/useDeleteProduct.query';

export default function ProductsPage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useGetProducts({ page, limit: 10 });
  const deleteProduct = useDeleteProduct();
  
  const products = data?.data || [];

  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProduct.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const columns: ColumnDef<Product>[] = [
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
          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
            {image ? (
              <Image
                src={image}
                alt={row.getValue('title') as string}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                No image
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'title',
      header: 'Name',
    },
    {
      accessorKey: 'category_id',
      header: 'Category',
      cell: ({ row }) => {
        return <div>{row.getValue('category_id')}</div>;
      },
    },
    {
      accessorKey: 'brand_id',
      header: 'Brand',
      cell: ({ row }) => {
        return <div>{row.getValue('brand_id')}</div>;
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        const lowStockThreshold = row.original.low_stock_threshold;
        return (
          <div className={stock <= lowStockThreshold ? 'text-red-600 font-medium' : ''}>
            {stock}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const variant =
          status === 'active'
            ? 'default'
            : status === 'out_of_stock'
              ? 'destructive'
              : 'secondary';

        return (
          <Badge variant={variant}>
            {status.replace('_', ' ').toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'featured',
      header: 'Featured',
      cell: ({ row }) => {
        const featured = row.getValue('featured') as boolean;
        return featured ? (
          <Badge variant="outline">⭐ Featured</Badge>
        ) : null;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <TableActions
            onView={() => router.push(`/products/${product.product_id}`)}
            onEdit={() => router.push(`/products/${product.product_id}/edit`)}
            onDelete={() => setDeleteId(product.product_id)}
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Products"
          description="Manage your products"
          addNewLabel="Add Product"
          addNewHref="/products/add"
        />
        <div className="text-center py-10 text-red-500">
          Error loading products. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your products"
        addNewLabel="Add Product"
        addNewHref="/products/add"
      />

      <DataTable 
        columns={columns} 
        data={products} 
        searchKey="title" 
        searchPlaceholder="Search products..." 
        isLoading={isLoading}
      />

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isLoading={deleteProduct.isPending}
      />
    </div>
  );
}
