'use client';

import {
  Award,
  BarChart3,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  FolderTree,
  Globe,
  History,
  Image,
  ImagePlus,
  Layers,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Package,
  PackagePlus,
  Phone,
  PlusCircle,
  Search,
  Send,
  Settings,
  Share2,
  Shield,
  ShoppingCart,
  Tag,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCanAccessModule, useIsSuperAdmin } from '@/hooks/use-permissions';
import { Module } from '@/types/permissions';
import { authUtils } from '@/utils/auth';

type MenuItem = {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  module?: Module; // For permission checking
  superAdminOnly?: boolean;
  items?: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
};

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    module: Module.DASHBOARD,
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    badge: '12',
    module: Module.ORDERS,
    items: [
      { title: 'All Orders', href: '/orders', icon: ShoppingCart },
      { title: 'Pending', href: '/orders/pending', icon: Clock },
      { title: 'Completed', href: '/orders/completed', icon: CheckCircle },
      { title: 'Cancelled', href: '/orders/cancelled', icon: XCircle },
    ],
  },
  {
    title: 'Products',
    icon: Package,
    module: Module.PRODUCTS,
    items: [
      { title: 'All Products', href: '/products', icon: Package },
      { title: 'Add Product', href: '/products/add', icon: PackagePlus },
      { title: 'Variants', href: '/products/variants', icon: Layers },
      { title: 'Manage Stock', href: '/products/stock', icon: Tag },
    ],
  },
  {
    title: 'Categories',
    icon: FolderTree,
    module: Module.CATEGORIES,
    items: [
      { title: 'Main Categories', href: '/categories', icon: FolderTree },
      { title: 'Sub Categories', href: '/categories/sub', icon: Layers },
      { title: 'Assign Categories', href: '/categories/assign', icon: Tag },
    ],
  },
  {
    title: 'Collections',
    icon: Layers,
    module: Module.COLLECTIONS,
    items: [
      { title: 'All Collections', href: '/collections', icon: Layers },
      { title: 'Add Collection', href: '/collections/add', icon: PlusCircle },
      { title: 'Assign Products', href: '/collections/assign', icon: Tag },
    ],
  },
  {
    title: 'Brands',
    href: '/brands',
    icon: Award,
    module: Module.BRANDS,
  },
  {
    title: 'Banners',
    icon: Image,
    module: Module.BANNERS,
    items: [
      { title: 'Homepage Banners', href: '/banners', icon: Image },
      { title: 'Add Banner', href: '/banners/add', icon: ImagePlus },
    ],
  },
  {
    title: 'Users',
    icon: Users,
    module: Module.USERS,
    items: [
      { title: 'All Users', href: '/users', icon: Users },
      { title: 'User Details', href: '/users/details', icon: UserCheck },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    badge: '3',
    module: Module.NOTIFICATIONS,
    items: [
      { title: 'Send Notification', href: '/notifications/send', icon: Send },
      { title: 'History', href: '/notifications', icon: History },
      { title: 'Announcements', href: '/notifications/announcements', icon: Megaphone },
    ],
  },
  {
    title: 'Terms & Conditions',
    icon: FileText,
    module: Module.TERMS,
    items: [
      { title: 'All Terms', href: '/terms', icon: FileText },
      { title: 'Add Terms', href: '/terms/add', icon: PlusCircle },
    ],
  },
  {
    title: 'Admin Management',
    icon: Shield,
    module: Module.ADMIN_MANAGEMENT,
    superAdminOnly: true,
    items: [
      { title: 'All Admins', href: '/admins', icon: Shield },
      { title: 'Add Admin', href: '/admins/add', icon: PlusCircle },
    ],
  },
  {
    title: 'Reports',
    icon: BarChart3,
    module: Module.REPORTS,
    items: [
      { title: 'Sales Report', href: '/reports/sales', icon: TrendingUp },
      { title: 'Order Report', href: '/reports/orders', icon: ShoppingCart },
      { title: 'User Growth', href: '/reports/users', icon: Users },
      { title: 'Product Performance', href: '/reports/products', icon: Package },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    module: Module.SETTINGS,
    items: [
      { title: 'Website Settings', href: '/settings', icon: Globe },
      { title: 'Contact Info', href: '/settings/contact', icon: Phone },
      { title: 'Payment Settings', href: '/settings/payment', icon: CreditCard },
      { title: 'Social Links', href: '/settings/social', icon: Share2 },
      { title: 'SEO Settings', href: '/settings/seo', icon: Search },
      { title: 'Admin Profile', href: '/settings/profile', icon: UserCircle },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = React.useState<string[]>([]);
  const isSuperAdmin = useIsSuperAdmin();

  // Pre-compute module access for all modules
  const canAccessDashboard = useCanAccessModule(Module.DASHBOARD);
  const canAccessOrders = useCanAccessModule(Module.ORDERS);
  const canAccessProducts = useCanAccessModule(Module.PRODUCTS);
  const canAccessCategories = useCanAccessModule(Module.CATEGORIES);
  const canAccessCollections = useCanAccessModule(Module.COLLECTIONS);
  const canAccessBrands = useCanAccessModule(Module.BRANDS);
  const canAccessBanners = useCanAccessModule(Module.BANNERS);
  const canAccessUsers = useCanAccessModule(Module.USERS);
  const canAccessNotifications = useCanAccessModule(Module.NOTIFICATIONS);
  const canAccessTerms = useCanAccessModule(Module.TERMS);
  const canAccessAdminManagement = useCanAccessModule(Module.ADMIN_MANAGEMENT);
  const canAccessReports = useCanAccessModule(Module.REPORTS);
  const canAccessSettings = useCanAccessModule(Module.SETTINGS);

  // Create a map for easy lookup
  const moduleAccessMap = React.useMemo(
    () => ({
      [Module.DASHBOARD]: canAccessDashboard,
      [Module.ORDERS]: canAccessOrders,
      [Module.PRODUCTS]: canAccessProducts,
      [Module.CATEGORIES]: canAccessCategories,
      [Module.COLLECTIONS]: canAccessCollections,
      [Module.BRANDS]: canAccessBrands,
      [Module.BANNERS]: canAccessBanners,
      [Module.USERS]: canAccessUsers,
      [Module.NOTIFICATIONS]: canAccessNotifications,
      [Module.TERMS]: canAccessTerms,
      [Module.ADMIN_MANAGEMENT]: canAccessAdminManagement,
      [Module.REPORTS]: canAccessReports,
      [Module.SETTINGS]: canAccessSettings,
    }),
    [
      canAccessDashboard,
      canAccessOrders,
      canAccessProducts,
      canAccessCategories,
      canAccessCollections,
      canAccessBrands,
      canAccessBanners,
      canAccessUsers,
      canAccessNotifications,
      canAccessTerms,
      canAccessAdminManagement,
      canAccessReports,
      canAccessSettings,
    ]
  );

  // Filter menu items based on permissions
  const visibleMenuItems = React.useMemo(() => {
    return menuItems.filter(item => {
      // SuperAdmin only items
      if (item.superAdminOnly && !isSuperAdmin) {
        return false;
      }

      // Check module access
      if (item.module) {
        return moduleAccessMap[item.module];
      }

      return true;
    });
  }, [isSuperAdmin, moduleAccessMap]);

  // Auto-open section if current page is within it
  React.useEffect(() => {
    const currentSection = visibleMenuItems.find(item =>
      item.items?.some(subItem => pathname.startsWith(subItem.href))
    );
    if (currentSection && !openSections.includes(currentSection.title)) {
      setOpenSections(prev => [...prev, currentSection.title]);
    }
  }, [pathname, visibleMenuItems, openSections]);

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      authUtils.logout();
    }
  };

  return (
    <Sidebar collapsible="icon" className="sticky top-0 h-screen border-r">
      <SidebarHeader className="border-b px-6 py-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black">
            <span className="text-lg font-bold text-white">H</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Hamfa Admin</span>
            <span className="text-muted-foreground text-xs">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleMenuItems.map(item => {
                  // Simple menu item without children
                  if (!item.items) {
                    const isActive = pathname === item.href;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={item.href!}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  // Collapsible menu item with children
                  const isOpen = openSections.includes(item.title);
                  const hasActiveChild = item.items.some(subItem =>
                    pathname.startsWith(subItem.href)
                  );

                  return (
                    <Collapsible
                      key={item.title}
                      open={isOpen}
                      onOpenChange={() => toggleSection(item.title)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={hasActiveChild}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="mr-2 ml-auto">
                                {item.badge}
                              </Badge>
                            )}
                            <ChevronDown
                              className={`ml-auto h-4 w-4 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map(subItem => {
                              const isActive = pathname === subItem.href;
                              return (
                                <SidebarMenuSubItem key={subItem.href}>
                                  <SidebarMenuSubButton asChild isActive={isActive}>
                                    <Link href={subItem.href}>
                                      <subItem.icon className="h-4 w-4" />
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 group-data-[collapsible=icon]:p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
