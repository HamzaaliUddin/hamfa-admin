'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authUtils } from '@/utils/auth';
import { LogOut, Settings, User } from 'lucide-react';

export function AdminNavbar() {
  const user = authUtils.getUser();

  const handleLogout = () => {
    authUtils.logout();
  };

  const getUserInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'AD';
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'super admin':
        return 'default';
      case 'admin':
        return 'secondary';
      case 'moderator':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Hamfa Admin</h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src="/avatar-placeholder.png" alt={user?.name || 'Admin'} />
                <AvatarFallback>
                  {getUserInitials(user?.name || 'Admin')}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <p className="text-sm leading-none font-medium">{user?.name || 'Admin'}</p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.email || 'admin@example.com'}
                </p>
                {user?.role?.name && (
                  <Badge variant={getRoleBadgeVariant(user.role.name) as any} className="w-fit text-xs">
                    {user.role.name}
                  </Badge>
                )}
                {user?.brand?.name && (
                  <p className="text-muted-foreground text-xs leading-none">
                    Brand: {user.brand.name}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
