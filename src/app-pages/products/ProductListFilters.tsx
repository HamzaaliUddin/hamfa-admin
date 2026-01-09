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

const ProductListFilters = ({ filters, handleFilters }: Props) => {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');

  const handleReset = () => {
    setSearchTerm('');
    handleFilters({
      search: '',
      sortKey: 'product_id',
      sortValue: 'DESC',
      page: 1,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">
      {/* Left Side - Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <select
          value={filters.sortValue}
          onChange={(e) => handleFilters({ sortValue: e.target.value })}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
        >
          <option value="DESC">Newest First</option>
          <option value="ASC">Oldest First</option>
        </select>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Right Side - Search */}
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

export default ProductListFilters;
