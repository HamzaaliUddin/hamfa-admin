'use client';

import { formatCurrency } from '@/utils/Numbers.util';

type Props = {
  amount: number;
  currency?: string;
  locale?: string;
  className?: string;
};

const PriceText = ({ amount, currency = 'PKR', locale = 'en-PK', className }: Props) => {
  return <span className={className}>{formatCurrency(amount, currency, locale)}</span>;
};

export default PriceText;

