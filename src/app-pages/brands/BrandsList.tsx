'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetBrands } from '@/queries/brands/useGetBrands.query';
import { IBrand } from '@/types/api.types';
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
    sortKey: 'name',
    sortValue: 'ASC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetBrands(filters);
  const brands = (data?.body?.data || []) as unknown as IBrand[];
  const totalCount = data?.body?.count || 0;
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
          {brands.map((row: IBrand) => (
            <TableRow key={row?.brand_id}>
              <TableCell>{row?.brand_id}</TableCell>
              <TableCell>
                <Image src={row?.logo} alt={row?.name} width={100} height={50} />
              </TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.status}</TableCell>
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
