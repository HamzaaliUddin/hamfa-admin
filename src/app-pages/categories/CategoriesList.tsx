'use client';

import { StatusBadge } from '@/components/common/StatusBadge';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetCategories, Category } from '@/queries/categories/useGetCategories.query';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import CategoryActions from './CategoryActions';
import CategoryListFilters from './CategoryListFilters';
import { categoriesColumnHeaders } from './Categories.helper';
import CategoriesDelete from './CategoriesDelete';

const CategoriesList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'name',
    sortValue: 'ASC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetCategories(filters);
  const categories = (data?.data || []) as unknown as Category[];
  const totalCount = data?.count || 0;

  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = categoriesColumnHeaders();
  
  return (
    <>
      <div className="rounded-md border">
        <CategoryListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(categories)} isLoading={isLoading || isFetching}>
          {categories?.map((row: Category) => (
            <TableRow key={row?.category_id}>
              <TableCell>{row?.category_id}</TableCell>
              <TableCell>
                <img
                  src={row?.image}
                  alt={row?.name}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell>
                <StatusBadge status={row?.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <CategoryActions row={row} />
                  <CategoriesDelete row={row} />
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

export default CategoriesList;

