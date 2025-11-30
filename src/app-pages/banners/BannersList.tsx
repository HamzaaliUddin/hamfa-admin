'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Table, TableWrapper } from '@/components/Table';
import Pagination from '@/components/Pagination';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetBanners } from '@/queries/banners/useGetBanners.query';
import { bannersColumnHeaders } from './Banners.helper';
import BannersListFilters from './BannersListFilters';
import BannersDelete from './BannersDelete';

const BannersList = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    status: '',
    search: '',
    sortKey: 'created_at',
    sortValue: 'ASC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10
  });

  const { data, isLoading, isFetching } = useGetBanners(filters);
  const banners = data?.data || [];
  const totalCount = data?.count || 0;

  const handleFilters = (newFilters: { [key: string]: any }) => {
    setFilters({
      ...filters,
      ...newFilters
    });
  };

  const handleEdit = (row: any) => {
    const url = makeURL(URLs.BannersEdit, { id: row?.id });
    router.push(url);
  };

  const handleView = (row: any) => {
    router.push(makeURL(URLs.BannersView, { id: row?.id }));
  };

  const headers = bannersColumnHeaders();

  return (
    <>
      <TableWrapper>
        <BannersListFilters filters={filters} handleFilters={handleFilters} />
        <Table
          headers={headers}
          noData={banners.length === 0}
          isLoading={isLoading || isFetching}
          isDense
        >
          {banners.map((row: any) => (
            <TableRow key={row?.id}>
              <TableCell className="text-center">
                <img 
                  src={row?.image || '/placeholder.png'} 
                  alt={row?.title} 
                  className="h-12 w-20 object-cover rounded"
                />
              </TableCell>
              <TableCell>{row?.title}</TableCell>
              <TableCell className="text-center">
                <Badge 
                  variant={row?.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {row?.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleView(row)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </Button>
                  <BannersDelete row={row} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableWrapper>

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

