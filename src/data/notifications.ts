// ============================================
// NOTIFICATIONS TYPES - Matching Backend Models
// ============================================

export type NotificationActorType = 'user' | 'super_admin' | 'admin' | 'moderator' | 'system';
export type NotificationType = 'success' | 'warning' | 'info' | 'announcement' | 'error';
export type NotificationStatus = 'sent' | 'failed' | 'scheduled';

export type Notification = {
  notification_id: number;
  title: string;
  message: string;
  description?: string;
  actor_type?: NotificationActorType;
  actor_id?: number;
  actor_name?: string;
  action?: string;
  type: NotificationType;
  status: NotificationStatus;
  read: boolean;
  sent_at?: string;
  created_at?: string;
  updated_at?: string;
};

export const notifications: Notification[] = [];

export default notifications;
