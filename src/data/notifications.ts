// ============================================
// NOTIFICATIONS MOCK DATA
// ============================================

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'announcement' | 'error';
  recipients: string; // 'all' or number of users
  recipientIds?: string[]; // Specific user IDs
  status: 'sent' | 'failed' | 'scheduled';
  read: boolean;
  clickCount: number;
  sentAt?: string; // Optional for scheduled notifications
  scheduledFor?: string;
  createdAt: string;
};

export const notifications: Notification[] = [];

export default notifications;

