import { TableHeaderProps } from '@/components/Table/Table';

// Users (Customers) have: user_id, name, email, is_active in backend
export const usersColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '10%',
    align: 'left'
  },
  {
    title: 'Name',
    width: '25%',
    align: 'left'
  },
  {
    title: 'Email',
    width: '35%',
    align: 'left'
  },
  {
    title: 'Status',
    width: '15%',
    align: 'center'
  },
  {
    title: 'Actions',
    width: '15%',
    align: 'center'
  }
];

export const userStatusFormRules = () => ({
  is_active: {
    required: 'Status is required'
  }
});
