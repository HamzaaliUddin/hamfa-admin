import { TableHeaderProps } from '@/components/Table/Table';

export const adminsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '8%',
    align: 'left'
  },
  {
    title: 'Admin',
    width: '25%',
    align: 'left'
  },
  {
    title: 'Role',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Status',
    width: '12%',
    align: 'left'
  },
  {
    title: 'Created',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Actions',
    width: '25%',
    align: 'center'
  }
];

export const adminFormRules = () => ({
  name: {
    required: 'Name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Name is required'
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address'
    }
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters'
    }
  },
  role_id: {
    required: 'Role is required'
  }
});

export const getRoleIcon = (roleName: string) => {
  switch (roleName) {
    case 'Super Admin':
      return 'ShieldCheck';
    case 'Admin':
      return 'Shield';
    case 'Moderator':
      return 'ShieldAlert';
    default:
      return 'Shield';
  }
};

export const getRoleBadgeVariant = (roleName: string) => {
  switch (roleName) {
    case 'Super Admin':
      return 'default';
    case 'Admin':
      return 'secondary';
    case 'Moderator':
      return 'outline';
    default:
      return 'secondary';
  }
};
