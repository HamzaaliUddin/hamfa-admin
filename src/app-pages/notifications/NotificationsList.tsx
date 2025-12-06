'use client';

import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { useGetNotifications, Notification } from '@/queries/notifications/useGetNotifications.query';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import NotificationListFilters from './NotificationListFilters';
import { notificationsColumnHeaders } from './Notifications.helper';
import NotificationsDelete from './NotificationsDelete';
import NotificationMarkAsRead from './NotificationMarkAsRead';
import { Check, CheckCheck } from 'lucide-react';

const getNotificationTypeBadge = (type: string) => {
  const typeConfig = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Success'
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Warning'
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Error'
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Info'
    }
  };

  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.info;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const NotificationsList = () => {
  const [filters, setFilters] = useState({
    search: '',
    sortKey: 'created_at',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetNotifications(filters);
  const notifications = (data?.body?.data || []) as unknown as Notification[];
  const totalCount = data?.body?.count || 0;
  
  const handleFilters = (newFilters: Record<string, string | number>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = notificationsColumnHeaders();
  
  return (
    <>
      <div className="rounded-md border">
        <NotificationListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(notifications)} isLoading={isLoading || isFetching}>
          {notifications?.map((row: Notification) => (
            <TableRow key={row?.notification_id} className={!row?.read ? 'bg-muted/30' : ''}>
              <TableCell className="text-center">
                {row?.read ? (
                  <CheckCheck className="h-4 w-4 text-blue-600 mx-auto" />
                ) : (
                  <Check className="h-4 w-4 text-gray-400 mx-auto" />
                )}
              </TableCell>
              <TableCell>{row?.notification_id}</TableCell>
              <TableCell className="font-medium">{row?.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {row?.description || row?.message}
              </TableCell>
              <TableCell>
                {getNotificationTypeBadge(row?.type)}
              </TableCell>
              <TableCell>
                <Badge variant={row?.status === 'sent' ? 'default' : row?.status === 'failed' ? 'destructive' : 'secondary'}>
                  {row?.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <NotificationMarkAsRead row={row} />
                  <NotificationsDelete row={row} />
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

export default NotificationsList;

