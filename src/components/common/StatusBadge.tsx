import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Status = 'active' | 'inactive' | 'out_of_stock' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'paid' | 'failed' | 'refunded';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusColors: Record<Status, string> = {
  active: 'bg-green-600 hover:bg-green-600',
  inactive: 'bg-gray-500 hover:bg-gray-500',
  out_of_stock: 'bg-red-600 hover:bg-red-600',
  pending: 'bg-yellow-500 hover:bg-yellow-500',
  processing: 'bg-blue-500 hover:bg-blue-500',
  shipped: 'bg-purple-500 hover:bg-purple-500',
  delivered: 'bg-green-600 hover:bg-green-600',
  cancelled: 'bg-red-600 hover:bg-red-600',
  paid: 'bg-green-600 hover:bg-green-600',
  failed: 'bg-red-600 hover:bg-red-600',
  refunded: 'bg-gray-500 hover:bg-gray-500',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const colorClass = statusColors[status] || 'bg-gray-500 hover:bg-gray-500';
  const displayText = status?.replace(/_/g, ' ');

  return (
    <Badge
      className={cn(
        'border-0 font-medium text-white capitalize',
        colorClass,
        className
      )}
    >
      {displayText}
    </Badge>
  );
};
