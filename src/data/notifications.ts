// ============================================
// NOTIFICATIONS MOCK DATA
// ============================================

import { NotificationModelType } from '@be-types/notifications/notifications.type';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationModelType['type'];
  recipients: string; // 'all' or number of users
  recipientIds?: string[]; // Specific user IDs
  status: NotificationModelType['status'];
  read: boolean;
  clickCount: number;
  sentAt?: string; // Optional for scheduled notifications
  scheduledFor?: string;
  createdAt: string;
};

export const notifications: Notification[] = [];

export default notifications;

