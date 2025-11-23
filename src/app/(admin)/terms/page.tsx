'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';
import { TableActions } from '@/components/common/table-actions';
import { useRouter } from 'next/navigation';
import { useGetTerms, Term } from '@/queries/terms/useGetTerms.query';

export default function TermsPage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useGetTerms({ page, limit: 10 });

  const terms = data?.data || [];

  const columns: ColumnDef<Term>[] = [
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
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'version',
      header: 'Version',
      cell: ({ row }) => <div>{row.getValue('version')}</div>,
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
      accessorKey: 'effective_date',
      header: 'Effective Date',
      cell: ({ row }) => {
        const date = row.getValue('effective_date') as string;
        return date ? new Date(date).toLocaleDateString('en-IN') : '—';
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const term = row.original;
        return (
          <TableActions
            onView={() => router.push(`/terms/${term.term_id}`)}
            onEdit={() => router.push(`/terms/${term.term_id}/edit`)}
            viewLabel="View Details"
            editLabel="Edit Terms"
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Terms & Conditions" description="Manage website terms and policies" addNewLabel="Add Terms" addNewHref="/terms/add" />
        <div className="text-center py-10 text-red-500">Error loading terms. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Terms & Conditions" description="Manage website terms and policies" addNewLabel="Add Terms" addNewHref="/terms/add" />
      <DataTable columns={columns} data={terms} searchKey="title" searchPlaceholder="Search terms..." isLoading={isLoading} />
    </div>
  );
}
