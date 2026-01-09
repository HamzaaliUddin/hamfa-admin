'use client';

import { StatusBadge } from '@/components/common/StatusBadge';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Brand, useGetBrands } from '@/queries/brands/useGetBrands.query';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { BrandActions } from './BrandActions';
import BrandListFilters from './BrandListFilters';
import { brandsColumnHeaders } from './Brands.helper';
import BrandsDelete from './BrandsDelete';

const BrandsList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'brand_id',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetBrands(filters);
  const brands = (data?.data || []) as unknown as Brand[];
  const totalCount = data?.count || 0;
  
  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = brandsColumnHeaders();
  
  return (
    <>
      <div className="rounded-md border">
        <BrandListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(brands)} isLoading={isLoading || isFetching}>
          {brands?.map((row: Brand) => (
            <TableRow key={row?.brand_id}>
              <TableCell>{row?.brand_id}</TableCell>
              <TableCell>
                {row?.logo && (
                  <Image
                    src={row.logo}
                    alt={row.name}
                    width={80}
                    height={40}
                    className="object-contain"
                  />
                )}
              </TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">{row?.slug}</TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary">{row?.collection_count || 0}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <StatusBadge status={row?.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <BrandActions row={row} />
                  <BrandsDelete row={row} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>

      <Pagination
        page={+filters?.page}
        setPage={(value: number) => handleFilters({ page: value })}
        total={+totalCount}
        limit={filters?.limit}
        className="mt-4"
      />
    </>
  );
};

export default BrandsList;
