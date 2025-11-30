import { TableHeaderProps } from '@/components/Table/Table';

export const usersColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '8%',
    align: 'left'
  },
  {
    title: 'Name',
    width: '20%',
    align: 'left'
  },
  {
    title: 'Email',
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
    title: 'Actions',
    width: '20%',
    align: 'center'
  }
];

export const userStatusFormRules = () => ({
  is_active: {
    required: 'Status is required'
  }
});

