'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetBanners, Banner } from '@/queries/banners/useGetBanners.query';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import { BannerActions } from './BannerActions';
import BannerListFilters from './BannerListFilters';
import { bannersColumnHeaders } from './Banners.helper';
import BannersDelete from './BannersDelete';

const BannersList = () => {
  const [filters, setFilters] = useState({
    sortKey: 'banner_id',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetBanners(filters);
  const banners = data?.data || [];
  const totalCount = data?.count || 0;

  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = bannersColumnHeaders();
  return (
    <>
      <div className="rounded-md border">
        <BannerListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(banners)} isLoading={isLoading || isFetching} skeletonRows={filters.limit}>
          {banners.map((row: Banner) => (
            <TableRow key={row?.banner_id}>
              <TableCell>{row?.banner_id}</TableCell>
              <TableCell>
                {row?.image && (
                  <Image
                    src={row.image}
                    alt={`Banner ${row.banner_id}`}
                    width={200}
                    height={80}
                    className="rounded-md object-cover"
                  />
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <BannerActions row={row} />
                  <BannersDelete row={row} />
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

export default BannersList;
