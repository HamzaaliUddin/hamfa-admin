'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetProducts, Product } from '@/queries/products/useGetProducts.query';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { ProductActions } from './ProductActions';
import ProductListFilters from './ProductListFilters';
import { productsColumnHeaders } from './Products.helper';
import ProductsDelete from './ProductsDelete';

const ProductsList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'title',
    sortValue: 'ASC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetProducts(filters);
  const products = data?.body?.data || [];
  const totalCount = data?.body?.count || 0;

  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = productsColumnHeaders();
  return (
    <>
      <div className="rounded-md border">
        <ProductListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(products)} isLoading={isLoading || isFetching}>
          {products.map((row: Product) => (
            <TableRow key={row?.product_id}>
              <TableCell>{row?.product_id}</TableCell>
              <TableCell>
                <Image src={row?.image} alt={row?.title} width={100} height={50} />
              </TableCell>
              <TableCell>{row?.title}</TableCell>
              <TableCell>{row?.sku}</TableCell>
              <TableCell>${row?.price}</TableCell>
              <TableCell>{row?.stock}</TableCell>
              <TableCell>{row?.status}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <ProductActions row={row} />
                  <ProductsDelete row={row} />
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

export default ProductsList;

