'use client';

import { Button } from '@/components/ui/button';
import { Notification } from '@/queries/notifications/useGetNotifications.query';
import { useMarkNotificationAsRead } from '@/queries/notifications/useMarkNotificationAsRead.query';
import { Check } from 'lucide-react';

type Props = {
  row: Notification;
};

const NotificationMarkAsRead = ({ row }: Props) => {
  const { mutate: markAsRead, isPending } = useMarkNotificationAsRead();

  const handleMarkAsRead = () => {
    markAsRead(row.notification_id);
  };

  // If already read, don't show the button
  if (row.read) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleMarkAsRead}
      disabled={isPending}
    >
      <Check className="mr-2 h-4 w-4" />
      Mark as Read
    </Button>
  );
};

export default NotificationMarkAsRead;

