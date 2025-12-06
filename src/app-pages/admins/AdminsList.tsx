'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetAdmins, Admin } from '@/queries/admins';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import AdminActions from './AdminActions';
import AdminListFilters from './AdminListFilters';
import { adminsColumnHeaders, getRoleBadgeVariant } from './Admins.helper';
import AdminsDelete from './AdminsDelete';

const getRoleIcon = (roleName: string) => {
  switch (roleName) {
    case 'Super Admin':
      return <ShieldCheck className="h-4 w-4" />;
    case 'Admin':
      return <Shield className="h-4 w-4" />;
    case 'Moderator':
      return <ShieldAlert className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

const AdminsList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'user_id',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetAdmins(filters);
  const admins = data?.data || [];
  const totalCount = data?.count || 0;

  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = adminsColumnHeaders();

  return (
    <>
      <div className="rounded-md border">
        <AdminListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(admins)} isLoading={isLoading || isFetching}>
          {admins.map((row: Admin) => (
            <TableRow key={row?.user_id}>
              <TableCell>{row?.user_id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{row?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{row?.name}</p>
                    <p className="text-muted-foreground text-sm">{row?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(row?.role?.name || '')} className="gap-1">
                  {getRoleIcon(row?.role?.name || '')}
                  {row?.role?.name}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={row?.is_active ? 'default' : 'secondary'}>
                  {row?.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                {row?.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <AdminActions row={row} />
                  <AdminsDelete row={row} />
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

export default AdminsList;
