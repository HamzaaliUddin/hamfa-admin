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
    search: '',
    sortKey: 'title',
    sortValue: 'ASC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetBanners(filters);
  const banners = data?.body?.data || [];
  const totalCount = data?.body?.count || 0;

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
        <Table headers={headers} noData={isEmpty(banners)} isLoading={isLoading || isFetching}>
          {banners.map((row: Banner) => (
            <TableRow key={row?.banner_id}>
              <TableCell>{row?.banner_id}</TableCell>
              <TableCell>
                <Image src={row?.image} alt={row?.title} width={100} height={50} />
              </TableCell>
              <TableCell>{row?.title}</TableCell>
              {/* Removed redirect_url column - not in backend model */}
              <TableCell>{row?.status}</TableCell>
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

