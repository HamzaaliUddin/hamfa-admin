'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetCollections, Collection } from '@/queries/collections/useGetCollections.query';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { CollectionActions } from './CollectionActions';
import CollectionListFilters from './CollectionListFilters';
import { collectionsColumnHeaders } from './Collections.helper';
import CollectionsDelete from './CollectionsDelete';

const CollectionsList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'name',
    sortValue: 'ASC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetCollections(filters);
  const collections = data?.body?.data || [];
  const totalCount = data?.body?.count || 0;

  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = collectionsColumnHeaders();
  return (
    <>
      <div className="rounded-md border">
        <CollectionListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(collections)} isLoading={isLoading || isFetching}>
          {collections.map((row: Collection) => (
            <TableRow key={row?.collection_id}>
              <TableCell>{row?.collection_id}</TableCell>
              <TableCell>
                <Image src={row?.image} alt={row?.name} width={100} height={50} />
              </TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.product_count}</TableCell>
              <TableCell>{row?.status}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <CollectionActions row={row} />
                  <CollectionsDelete row={row} />
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

export default CollectionsList;

