import { TableHeaderProps } from '@/components/Table/Table';
import { OrderStageEnums, OrderTypeEnums, PaymentTypeEnums, PaymentStageEnums } from '@/types/api.types';

export const ordersColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'Order ID',
    width: '7%'
  },
  {
    title: 'Order Date',
    width: '15%'
  },
  {
    title: 'Customer',
    width: '18%'
  },
  {
    title: 'Total',
    width: '10%',
    align: 'center'
  },
  {
    title: 'Payment Type',
    width: '12%',
    align: 'center'
  },
  {
    title: 'Payment Status',
    width: '14%',
    align: 'center'
  },
  {
    title: 'Delivery Status',
    width: '14%',
    align: 'center'
  },
  {
    title: 'Actions',
    width: '10%',
    align: 'center'
  }
];

export const geOrderPaymentTexts = () => ({
  [PaymentTypeEnums.COD]: 'Cash on Delivery',
  [PaymentTypeEnums.CREDIT]: 'Credit Card',
  [PaymentTypeEnums.DEBIT]: 'Debit Card'
});

export const getOrderStatusText = () => ({
  [OrderStageEnums.Ordered]: 'Order Placed',
  [OrderStageEnums.Preparing]: 'Processing',
  [OrderStageEnums.Delivering]: 'Dispatched',
  [OrderStageEnums.Delivered]: 'Delivered',
  [OrderTypeEnums.Cancelled]: 'Cancelled'
});

