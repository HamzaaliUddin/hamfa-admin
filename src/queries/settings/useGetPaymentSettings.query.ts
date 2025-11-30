'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';

export interface PaymentSettings {
  stripeEnabled?: boolean;
  stripePublicKey?: string;
  paypalEnabled?: boolean;
  paypalClientId?: string;
  codEnabled?: boolean;
  currency?: string;
  taxRate?: number;
  shippingFee?: number;
}

const fetchPaymentSettings = async (): Promise<PaymentSettings> => {
  return await axiosInstance.get('settings/payment');
};

export const useGetPaymentSettings = () => {
  return useQuery({
    queryKey: ['settings', 'payment'],
    queryFn: fetchPaymentSettings,
  });
};

