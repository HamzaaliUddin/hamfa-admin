'use client';

import { formatCurrency } from '@/utils/Numbers.util';

type Props = {
  amount: number;
  currency?: string;
  locale?: string;
  className?: string;
};

const PriceText = ({ amount, currency = 'USD', locale = 'en-US', className }: Props) => {
  return <span className={className}>{formatCurrency(amount, currency, locale)}</span>;
};

export default PriceText;

