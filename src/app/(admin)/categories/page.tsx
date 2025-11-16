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
import { categories as categoriesData, Category } from '@/data/categories';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = React.useState<Category[]>(categoriesData);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    setTimeout(() => {
      setCategories(categories.filter((c) => c.id !== deleteId));
      setIsDeleting(false);
      setDeleteId(null);
    }, 1000);
  };

  const columns: ColumnDef<Category>[] = [
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
      accessorKey: 'name',
      header: 'Category Name',
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
      accessorKey: 'parentId',
      header: 'Parent Category',
      cell: ({ row }) => {
        const parentId = row.getValue('parentId') as string | null;
        if (!parentId) return <span className="text-muted-foreground text-sm">Main Category</span>;
        const parentCat = categories.find(c => c.id === parentId);
        return parentCat ? (
          <Badge variant="outline">{parentCat.name}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        );
      },
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
        const category = row.original;

        return (
          <TableActions
            onView={() => router.push(`/categories/${category.id}`)}
            onEdit={() => router.push(`/categories/${category.id}/edit`)}
            onDelete={() => setDeleteId(category.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Manage product categories and subcategories"
        addNewLabel="Add Category"
        addNewHref="/categories/add"
      />

      <DataTable 
        columns={columns} 
        data={categories} 
        searchKey="name" 
        searchPlaceholder="Search categories..." 
      />

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category? All subcategories will also be affected."
        isLoading={isDeleting}
      />
    </div>
  );
}
