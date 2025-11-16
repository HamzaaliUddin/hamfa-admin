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

// Sample Product Type
export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image?: string;
  createdAt: string;
};

// Sample Data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    brand: 'Nike',
    price: 2999,
    stock: 50,
    status: 'active',
    image: '/placeholder-product.jpg',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Running Shoes Pro',
    category: 'Footwear',
    brand: 'Adidas',
    price: 8999,
    stock: 25,
    status: 'active',
    image: '/placeholder-product.jpg',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    name: 'Sports Water Bottle',
    category: 'Accessories',
    brand: 'Puma',
    price: 499,
    stock: 0,
    status: 'inactive',
    image: '/placeholder-product.jpg',
    createdAt: '2024-01-13',
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = React.useState<Product[]>(sampleProducts);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(products.filter((p) => p.id !== deleteId));
      setIsDeleting(false);
      setDeleteId(null);
    }, 1000);
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
                alt={row.getValue('name')}
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
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(price);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        return (
          <div className={stock === 0 ? 'text-destructive font-medium' : ''}>
            {stock === 0 ? 'Out of Stock' : stock}
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
        const product = row.original;

        return (
          <TableActions
            onView={() => router.push(`/products/${product.id}`)}
            onEdit={() => router.push(`/products/${product.id}/edit`)}
            onDelete={() => setDeleteId(product.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your products"
        addNewLabel="Add Product"
        addNewHref="/products/add"
      />

      <DataTable columns={columns} data={products} searchKey="name" searchPlaceholder="Search products..." />

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
}
