'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export type SortValue = 'ASC' | 'DESC';

export interface SortOption {
  label: string;
  value: string;
}

interface SortFilterProps {
  sortValue: SortValue;
  onSortChange: (value: SortValue) => void;
  onReset: () => void;
  className?: string;
}

const SortFilter = ({
  sortValue,
  onSortChange,
  onReset,
  className = '',
}: SortFilterProps) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 p-4 border-b ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value as SortValue)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
        >
          <option value="DESC">Newest First</option>
          <option value="ASC">Oldest First</option>
        </select>
      </div>
      <Button variant="outline" size="sm" onClick={onReset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
};

export default SortFilter;

