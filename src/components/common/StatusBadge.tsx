import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Status = 'active' | 'inactive';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const isActive = status === 'active';

  return (
    <Badge
      className={cn(
        'border-0 font-medium text-white capitalize',
        isActive ? 'bg-green-600 hover:bg-green-600' : 'bg-red-600 hover:bg-red-600',
        className
      )}
    >
      {status}
    </Badge>
  );
};
