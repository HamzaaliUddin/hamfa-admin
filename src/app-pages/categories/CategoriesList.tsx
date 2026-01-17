'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetCategories, Category } from '@/queries/categories/useGetCategories.query';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import CategoryActions from './CategoryActions';
import CategoryListFilters from './CategoryListFilters';
import { categoriesColumnHeaders } from './Categories.helper';
import CategoriesDelete from './CategoriesDelete';

const CategoriesList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'category_id',
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
        <Table headers={headers} noData={isEmpty(categories)} isLoading={isLoading || isFetching} skeletonRows={filters.limit}>
          {categories?.map((row: Category) => (
            <TableRow key={row?.category_id}>
              <TableCell>{row?.category_id}</TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">{row?.slug}</TableCell>
              <TableCell className="text-center">{row?.position ?? '-'}</TableCell>
              <TableCell className="text-center">
                {row?.show_on_home ? (
                  <Check className="h-4 w-4 text-green-600 mx-auto" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={row?.status === 'active' ? 'default' : 'secondary'}>
                  {row?.status || 'active'}
                </Badge>
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
