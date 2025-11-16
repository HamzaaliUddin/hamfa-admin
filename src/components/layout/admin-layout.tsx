'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminNavbar } from './admin-navbar';
import { AppSidebar } from './app-sidebar';

function AdminContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col transition-all duration-300 ease-linear">
      <header className="bg-background sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AdminNavbar />
      </header>
      <main className="flex flex-1 flex-col p-6">{children}</main>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <AdminContent>{children}</AdminContent>
    </SidebarProvider>
  );
}
