'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetCollections, Collection } from '@/queries/collections/useGetCollections.query';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import CollectionActions from './CollectionActions';
import CollectionListFilters from './CollectionListFilters';
import { collectionsColumnHeaders } from './Collections.helper';
import CollectionsDelete from './CollectionsDelete';

const CollectionsList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'collection_id',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetCollections(filters);
  const collections = (data?.data || []) as unknown as Collection[];
  const totalCount = data?.count || 0;
  
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
        <Table headers={headers} noData={isEmpty(collections)} isLoading={isLoading || isFetching} skeletonRows={filters.limit}>
          {collections?.map((row: Collection) => (
            <TableRow key={row?.collection_id}>
              <TableCell>{row?.collection_id}</TableCell>
              <TableCell>
                {row?.image && (
                  <Image
                    src={row.image}
                    alt={row.title}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                )}
              </TableCell>
              <TableCell>{row?.title}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">{row?.slug}</TableCell>
              <TableCell>
                <Badge variant={row?.show_in_nav ? 'default' : 'secondary'}>
                  {row?.show_in_nav ? 'Yes' : 'No'}
                </Badge>
              </TableCell>
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
