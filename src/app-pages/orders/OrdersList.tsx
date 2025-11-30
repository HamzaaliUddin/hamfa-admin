'use client';

import { isEmpty } from 'lodash';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { IOrder } from '@/types/api.types';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetOrders } from '@/queries/orders/useGetOrders.query';
import OrdersListFilters from './OrdersListFilters';
import { geOrderPaymentTexts, ordersColumnHeaders } from './Orders.helper';
import OrdersDeliveryStatus from './OrdersDeliveryStatus';
import OrdersPaymentStatus from './OrdersPaymentStatus';

const OrdersList = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    order_type: '',
    search: '',
    sortKey: 'created_at',
    sortValue: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    limit: 10
  });

  const { data, isLoading, isFetching } = useGetOrders(filters);
  const orders: IOrder[] = (data?.data as any) || [];
  const totalCount = data?.count || 0;

  const handleFilters = (newFilters: { [key: string]: any }) => {
    setFilters({
      ...filters,
      ...newFilters
    });
  };

  const handleView = (row: IOrder) => {
    const url = makeURL(URLs.OrdersView, { id: row?.order_id });
    router.push(url);
  };

  const headers = ordersColumnHeaders();
  const paymentTexts = geOrderPaymentTexts();

  return (
    <>
      <div className="rounded-md border">
        <OrdersListFilters filters={filters} handleFilters={handleFilters} />
        <Table
          headers={headers}
          noData={isEmpty(orders)}
          isLoading={isLoading || isFetching}
        >
          {orders.map((row: IOrder) => (
            <TableRow key={row?.order_id}>
              <TableCell className="text-center">
                {row?.order_id}
              </TableCell>
              <TableCell>
                {row?.created_at
                  ? dayjs(row?.created_at).format('DD MMM YYYY, hh:mm A')
                  : '-'}
              </TableCell>
              <TableCell>{row?.full_name || '-'}</TableCell>
              <TableCell className="text-center">
                QAR {row?.invoice_details?.grand_total || '-'}
              </TableCell>
              <TableCell className="text-center">
                {paymentTexts[row.payment_method_text] || '-'}
              </TableCell>
              <TableCell className="text-center">
                <OrdersPaymentStatus row={row} />
              </TableCell>
              <TableCell className="text-center">
                <OrdersDeliveryStatus row={row} />
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleView(row)}
                  >
                    View
                  </Button>
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

