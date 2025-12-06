'use client';

import { CrudFormSection, CrudLayout } from '@/components/common/crud-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreateAdmin, useGetModules, useGetRoles } from '@/queries/admins';
import { Shield, ShieldAlert, ShieldCheck, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

// Permission labels
const PERMISSION_LABELS: Record<string, string> = {
  view: 'View',
  create: 'Create',
  update: 'Update',
  delete: 'Delete',
};

// Get role icon
const getRoleIcon = (roleName: string) => {
  switch (roleName) {
    case 'Super Admin':
      return <ShieldCheck className="h-4 w-4" />;
    case 'Admin':
      return <Shield className="h-4 w-4" />;
    case 'Moderator':
      return <ShieldAlert className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

interface ModulePermission {
  module: string;
  moduleName: string;
  permissions: string[];
}

export default function AddAdminPage() {
  const router = useRouter();

  // API Queries
  const { data: modulesData, isLoading: modulesLoading } = useGetModules();
  const { data: rolesData, isLoading: rolesLoading } = useGetRoles();
  const createAdminMutation = useCreateAdmin();

  // Form state
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [selectedRoleId, setSelectedRoleId] = React.useState<string>('');
  const [isActive, setIsActive] = React.useState(true);

  // Module permissions state
  const [selectedModule, setSelectedModule] = React.useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);
  const [modulePermissions, setModulePermissions] = React.useState<ModulePermission[]>([]);

  const modules = modulesData?.data || [];
  const roles = rolesData?.data || [];

  // Get available modules (not already assigned)
  const availableModules = modules.filter(
    (m: any) => !modulePermissions.some(mp => mp.module === m.module)
  );

  // Get current module config
  const currentModuleConfig = selectedModule
    ? modules.find((m: any) => m.module === selectedModule)
    : null;

  // Get selected role details
  const selectedRole = roles.find((r: any) => r.role_id === Number(selectedRoleId));

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission) ? prev.filter(p => p !== permission) : [...prev, permission]
    );
  };

  const handleAddModulePermission = () => {
    if (!selectedModule || selectedPermissions.length === 0) return;

    const moduleConfig = modules.find((m: any) => m.module === selectedModule);
    setModulePermissions(prev => [
      ...prev,
      {
        module: selectedModule,
        moduleName: moduleConfig?.name || selectedModule,
        permissions: selectedPermissions,
      },
    ]);
    setSelectedModule('');
    setSelectedPermissions([]);
  };

  const handleRemoveModulePermission = (module: string) => {
    setModulePermissions(prev => prev.filter(mp => mp.module !== module));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !selectedRoleId) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    createAdminMutation.mutate(
      {
        name,
        email,
        password,
        role_id: Number(selectedRoleId),
        is_active: isActive,
      },
      {
        onSuccess: () => {
          router.push('/admins');
        },
      }
    );
  };

  const isLoading = modulesLoading || rolesLoading;

  return (
    <CrudLayout
      title="Add New Admin"
      description="Create a new admin account with specific permissions"
      backButton={{
        label: 'Back to Admins',
        href: '/admins',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Section - Main Form (2 columns) */}
          <div className="space-y-6 md:col-span-2">
            <CrudFormSection title="Basic Information">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., John Doe"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@hamfa.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      required
                      minLength={8}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-destructive text-sm">Passwords do not match</p>
                )}
              </div>
            </CrudFormSection>

            <CrudFormSection title="Module Permissions">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Module Dropdown */}
                    <div className="grid gap-2">
                      <Label htmlFor="module">Select Module</Label>
                      <Select
                        value={selectedModule}
                        onValueChange={value => {
                          setSelectedModule(value);
                          setSelectedPermissions([]);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a module" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableModules.map((module: any) => (
                            <SelectItem key={module.module} value={module.module}>
                              {module.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Permissions */}
                    <div className="grid gap-2">
                      <Label>Select Permissions</Label>
                      <div className="flex min-h-[40px] flex-wrap gap-3 rounded-md border p-3">
                        {currentModuleConfig?.availablePermissions?.map((permission: string) => (
                          <label
                            key={permission}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <Checkbox
                              checked={selectedPermissions.includes(permission)}
                              onCheckedChange={() => handlePermissionToggle(permission)}
                              disabled={!selectedModule}
                            />
                            <span className="text-sm">
                              {PERMISSION_LABELS[permission] || permission}
                            </span>
                          </label>
                        ))}
                        {!selectedModule && (
                          <span className="text-muted-foreground text-sm">
                            Select a module first
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddModulePermission}
                    disabled={!selectedModule || selectedPermissions.length === 0}
                  >
                    Add Module Permission
                  </Button>

                  {/* Assigned Permissions List */}
                  {modulePermissions.length > 0 && (
                    <div className="space-y-2">
                      <Label>Assigned Permissions</Label>
                      <div className="space-y-2">
                        {modulePermissions.map(mp => (
                          <div
                            key={mp.module}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{mp.moduleName}</span>
                              <div className="flex gap-1">
                                {mp.permissions.map(p => (
                                  <Badge key={p} variant="secondary">
                                    {PERMISSION_LABELS[p] || p}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveModulePermission(mp.module)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CrudFormSection>
          </div>

          {/* Right Section - Role & Status (1 column) */}
          <div className="space-y-6">
            <CrudFormSection title="Role & Status">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Admin Role *</Label>
                  {rolesLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role: any) => (
                          <SelectItem key={role.role_id} value={String(role.role_id)}>
                            <div className="flex items-center gap-2">
                              {getRoleIcon(role.name)}
                              {role.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {selectedRole && (
                    <p className="text-muted-foreground text-sm">{selectedRole.description}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={isActive}
                    onCheckedChange={checked => setIsActive(checked as boolean)}
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Set account as active
                  </Label>
                </div>
              </div>
            </CrudFormSection>

            <CrudFormSection title="Role Information">
              <div className="space-y-4">
                {rolesLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : (
                  roles.map((role: any) => (
                    <div key={role.role_id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(role.name)}
                        <h4 className="font-medium">{role.name}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">{role.description}</p>
                    </div>
                  ))
                )}
              </div>
            </CrudFormSection>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              createAdminMutation.isPending ||
              !name ||
              !email ||
              !password ||
              !selectedRoleId ||
              password !== confirmPassword
            }
          >
            {createAdminMutation.isPending ? 'Creating...' : 'Create Admin'}
          </Button>
        </div>
      </form>
    </CrudLayout>
  );
}
