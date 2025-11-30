import { TableHeaderProps } from '@/components/Table/Table';

export const brandsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '10%',
    align: 'left'
  },
  {
    title: 'Logo',
    width: '20%',
    align: 'left'
  },
  {
    title: 'Name',
    width: '30%',
    align: 'left'
  },
  {
    title: 'Status',
    width: '20%',
    align: 'left'
  },
  {
    title: 'Actions',
    width: '30%',
    align: 'center'
  }
];

export const brandFormRules = () => ({
  name: {
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Minimum 3 characters required'
    },
    maxLength: {
      value: 50,
      message: 'Maximum 50 characters allowed'
    },
    pattern: {
      value: /^[A-Za-z\u0600-\u06FF\s]+$/,
      message: 'Invalid characters'
    },
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'This field is required'
  }
});

