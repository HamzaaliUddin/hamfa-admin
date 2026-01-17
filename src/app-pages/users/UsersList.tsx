'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetUsers, User } from '@/queries/users/useGetUsers.query';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { UserActions } from './UserActions';
import UserListFilters from './UserListFilters';
import { usersColumnHeaders } from './Users.helper';
import UsersDelete from './UsersDelete';

const UsersList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'user_id',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    role: 'Customer',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetUsers(filters);
  const users = data?.data || [];
  const totalCount = data?.count || 0;

  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = usersColumnHeaders();
  return (
    <>
      <div className="rounded-md border">
        <UserListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(users)} isLoading={isLoading || isFetching} skeletonRows={filters.limit}>
          {users.map((row: User) => (
            <TableRow key={row?.user_id}>
              <TableCell>{row?.user_id}</TableCell>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell className="text-center">
                <Badge variant={row?.is_active ? 'default' : 'secondary'}>
                  {row?.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <UserActions row={row} />
                  <UsersDelete row={row} />
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

export default UsersList;
