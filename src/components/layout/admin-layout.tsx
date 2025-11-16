'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminNavbar } from './admin-navbar';
import { AppSidebar } from './app-sidebar';

function AdminContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex flex-1 flex-col">
      <header className="bg-background/60 border-border/50 sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AdminNavbar />
      </header>
      <div
        className="relative flex flex-1 flex-col transition-all duration-300"
        style={{
          backgroundImage: 'url(/logo/bg.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Semi-transparent overlay for better text readability */}
        <div className="bg-background/30 absolute inset-0 z-0" />
        <main className="relative z-10 flex flex-1 flex-col p-6">{children}</main>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <AdminContent>{children}</AdminContent>
      </div>
    </SidebarProvider>
  );
}
