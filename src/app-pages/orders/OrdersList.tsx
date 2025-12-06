'use client';

import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { Order, useGetOrders } from '@/queries/orders/useGetOrders.query';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { OrderActions } from './OrderActions';
import { geOrderPaymentTexts, ordersColumnHeaders } from './Orders.helper';
import OrdersDeliveryStatus from './OrdersDeliveryStatus';
import OrdersListFilters from './OrdersListFilters';
import OrdersPaymentStatus from './OrdersPaymentStatus';

const OrdersList = () => {
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    sortKey: 'created_at',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useGetOrders(filters);
  const orders: Order[] = data?.body?.data || [];
  const totalCount = data?.body?.count || 0;

  const handleFilters = (newFilters: { [key: string]: any }) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const headers = ordersColumnHeaders();
  const paymentTexts = geOrderPaymentTexts();

  return (
    <>
      <div className="rounded-md border">
        <OrdersListFilters filters={filters} handleFilters={handleFilters} />
        <Table headers={headers} noData={isEmpty(orders)} isLoading={isLoading || isFetching}>
          {orders.map((row: Order) => (
            <TableRow key={row?.order_id}>
              <TableCell className="text-center">{row?.order_id}</TableCell>
              <TableCell>
                {row?.created_at ? dayjs(row?.created_at).format('DD MMM YYYY, hh:mm A') : '-'}
              </TableCell>
              <TableCell>{row?.user_id || '-'}</TableCell>
              <TableCell className="text-center">QAR {row?.total || '-'}</TableCell>
              <TableCell className="text-center">
                {paymentTexts[row.payment_method] || '-'}
              </TableCell>
              <TableCell className="text-center">
                <OrdersPaymentStatus row={row} />
              </TableCell>
              <TableCell className="text-center">
                <OrdersDeliveryStatus row={row} />
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <OrderActions row={row} />
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

export default OrdersList;
