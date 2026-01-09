'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import TableSearch from '@/components/Table/TableSearch';

type SortValue = 'ASC' | 'DESC';

type Props = {
  filters: {
    search?: string;
    sortKey: string;
    sortValue: SortValue;
    page: number;
    limit: number;
  };
  handleFilters: (filters: Record<string, string | number>) => void;
};

const OrdersListFilters = ({ filters, handleFilters }: Props) => {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');

  const handleReset = () => {
    setSearchTerm('');
    handleFilters({
      search: '',
      sortKey: 'order_id',
      sortValue: 'DESC',
      page: 1,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border-b">
      {/* Left Side - Sort & Reset */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <select
            value={filters.sortValue}
            onChange={(e) => handleFilters({ sortValue: e.target.value })}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value="DESC">Newest</option>
            <option value="ASC">Oldest</option>
          </select>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Right Side - Search */}
      <div className="flex-1" />
      <TableSearch
        onChange={(value: string) => {
          setSearchTerm(value);
          handleFilters({ search: value, page: 1 });
        }}
        value={searchTerm}
      />
    </div>
  );
};

export default OrdersListFilters;
