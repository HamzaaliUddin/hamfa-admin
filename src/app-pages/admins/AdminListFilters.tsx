'use client';

import { useState } from 'react';
import TableSearch from '@/components/Table/TableSearch';

type Props = {
  filters: any;
  handleFilters: any;
};

const AdminListFilters = ({ filters, handleFilters }: Props) => {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');

  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <div className="hidden flex-1 md:block" />

      <TableSearch
        onChange={(value: string) => {
          setSearchTerm(value);
          handleFilters({ search: value });
        }}
        value={searchTerm}
      />
    </div>
  );
};

export default AdminListFilters;
