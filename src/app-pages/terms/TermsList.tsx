'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetTerms, Term } from '@/queries/terms/useGetTerms.query';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import TermActions from './TermActions';
import TermListFilters from './TermListFilters';
import { termsColumnHeaders } from './Terms.helper';
import TermsDelete from './TermsDelete';
import { Badge } from '@/components/ui/badge';

const TermsList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'created_at',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetTerms(filters);
  const terms = data?.data || [];
  const totalCount = data?.count || 0;

  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = termsColumnHeaders();
  return (
    <>
      <div className="rounded-md border">
        <TermListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(terms)} isLoading={isLoading || isFetching} skeletonRows={filters.limit}>
          {terms.map((row: Term) => (
            <TableRow key={row?.term_id}>
              <TableCell>{row?.term_id}</TableCell>
              <TableCell className="font-medium">{row?.title}</TableCell>
              <TableCell>{row?.type || '-'}</TableCell>
              <TableCell>{row?.version || '-'}</TableCell>
              <TableCell>
                <Badge variant={row?.status === 'active' ? 'default' : 'secondary'}>
                  {row?.status?.charAt(0).toUpperCase() + row?.status?.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <TermActions row={row} />
                  <TermsDelete row={row} />
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

export default TermsList;

