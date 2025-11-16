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

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Product Launch',
    message: 'Check out our latest collection of winter clothing!',
    type: 'announcement',
    recipients: 'all',
    status: 'sent',
    read: false,
    clickCount: 542,
    sentAt: '2024-02-15T10:30:00',
    createdAt: '2024-02-15T10:30:00',
  },
  {
    id: '2',
    title: 'Order Shipped',
    message: 'Your order #1234 has been shipped and is on the way.',
    type: 'success',
    recipients: '152',
    recipientIds: ['u1', 'u2', 'u4'],
    status: 'sent',
    read: true,
    clickCount: 145,
    sentAt: '2024-02-15T09:15:00',
    createdAt: '2024-02-15T09:15:00',
  },
  {
    id: '3',
    title: 'Flash Sale Alert',
    message: 'Up to 50% off on selected items. Limited time offer!',
    type: 'warning',
    recipients: 'all',
    status: 'sent',
    read: false,
    clickCount: 892,
    sentAt: '2024-02-14T18:00:00',
    createdAt: '2024-02-14T18:00:00',
  },
  {
    id: '4',
    title: 'Account Update',
    message: 'Please update your profile information to continue.',
    type: 'info',
    recipients: '45',
    recipientIds: ['u5', 'u7', 'u9'],
    status: 'sent',
    read: true,
    clickCount: 32,
    sentAt: '2024-02-14T14:30:00',
    createdAt: '2024-02-14T14:30:00',
  },
  {
    id: '5',
    title: 'Payment Reminder',
    message: 'Your order payment is pending. Please complete it.',
    type: 'warning',
    recipients: '23',
    recipientIds: ['u1', 'u3'],
    status: 'sent',
    read: false,
    clickCount: 18,
    sentAt: '2024-02-14T11:00:00',
    createdAt: '2024-02-14T11:00:00',
  },
  {
    id: '6',
    title: 'Delivery Completed',
    message: 'Your order has been successfully delivered. Thank you!',
    type: 'success',
    recipients: '89',
    recipientIds: ['u2', 'u4', 'u6'],
    status: 'sent',
    read: true,
    clickCount: 85,
    sentAt: '2024-02-13T16:45:00',
    createdAt: '2024-02-13T16:45:00',
  },
  {
    id: '7',
    title: 'Weekend Special',
    message: 'Special discounts this weekend only. Shop now!',
    type: 'announcement',
    recipients: 'all',
    status: 'sent',
    read: false,
    clickCount: 654,
    sentAt: '2024-02-13T08:00:00',
    createdAt: '2024-02-13T08:00:00',
  },
  {
    id: '8',
    title: 'Stock Alert',
    message: 'Popular items are back in stock. Order before they sell out!',
    type: 'info',
    recipients: 'all',
    status: 'sent',
    read: false,
    clickCount: 423,
    sentAt: '2024-02-12T15:20:00',
    createdAt: '2024-02-12T15:20:00',
  },
  {
    id: '9',
    title: 'Security Alert',
    message: 'We detected a login from a new device. Was this you?',
    type: 'error',
    recipients: '12',
    recipientIds: ['u5'],
    status: 'sent',
    read: true,
    clickCount: 12,
    sentAt: '2024-02-11T20:10:00',
    createdAt: '2024-02-11T20:10:00',
  },
  {
    id: '10',
    title: 'Upcoming Sale',
    message: 'Big sale starts tomorrow at 9 AM. Get ready!',
    type: 'announcement',
    recipients: 'all',
    status: 'scheduled',
    read: false,
    clickCount: 0,
    scheduledFor: '2024-02-16T09:00:00',
    createdAt: '2024-02-15T14:00:00',
  },
];

export default notifications;

