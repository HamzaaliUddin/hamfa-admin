'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

type Props = {
  filters: {
    sortKey: string;
    sortValue: 'ASC' | 'DESC';
    page: number;
    limit: number;
  };
  handleFilters: (filters: Record<string, string | number>) => void;
};

const BannerListFilters = ({ filters, handleFilters }: Props) => {
  const handleReset = () => {
    handleFilters({
      sortKey: 'banner_id',
      sortValue: 'DESC',
      page: 1,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border-b">
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
      </div>
      <Button variant="outline" size="sm" onClick={handleReset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
};

export default BannerListFilters;
