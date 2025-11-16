'use client';

import { ProtectedRoute } from '@/components/common/protected-route';
import { AdminLayout } from '@/components/layout/admin-layout';

export default function AdminPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

