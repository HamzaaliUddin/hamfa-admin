'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminNavbar } from './admin-navbar';
import { AppSidebar } from './app-sidebar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="container mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
