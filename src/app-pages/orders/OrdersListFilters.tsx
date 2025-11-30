'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TableSearch from '@/components/Table/TableSearch';
import { OrderTypeEnums } from '@/types/api.types';

type Props = {
  filters: any;
  handleFilters: any;
};

const OrdersListFilters = ({ filters, handleFilters }: Props) => {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Open', value: OrderTypeEnums.Current },
    { label: 'Past', value: OrderTypeEnums.Past },
    { label: 'Cancelled', value: OrderTypeEnums.Cancelled }
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <div className="flex gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={filters?.order_type === option.value ? 'default' : 'outline'}
            onClick={() => handleFilters({ order_type: option.value })}
            size="sm"
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="flex-1 hidden md:block" />

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

export default OrdersListFilters;

