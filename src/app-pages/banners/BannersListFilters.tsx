'use client';

import { Button } from '@/components/ui/button';
import TableSearch from '@/components/Table/TableSearch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  filters: any;
  handleFilters: (filters: any) => void;
};

const BannersListFilters = ({ filters, handleFilters }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <TableSearch
        value={filters.search}
        onChange={(value) => handleFilters({ search: value })}
        placeholder="Search banners..."
        className="max-w-sm"
      />
      
      <div className="flex items-center gap-2">
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilters({ status: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        {(filters.search || filters.status) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilters({ search: '', status: '' })}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default BannersListFilters;

