import { TableHeaderProps } from '@/components/Table/Table';

export const categoriesColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '8%',
    align: 'left'
  },
  {
    title: 'Image',
    width: '12%',
    align: 'left'
  },
  {
    title: 'Name',
    width: '20%',
    align: 'left'
  },
  {
    title: 'Parent',
    width: '12%',
    align: 'left'
  },
  {
    title: 'Products',
    width: '12%',
    align: 'left'
  },
  {
    title: 'Status',
    width: '12%',
    align: 'left'
  },
  {
    title: 'Actions',
    width: '24%',
    align: 'center'
  }
];

export const categoryFormRules = () => ({
  name: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'Minimum 2 characters required'
    },
    maxLength: {
      value: 100,
      message: 'Maximum 100 characters allowed'
    },
    pattern: {
      value: /^[A-Za-z\u0600-\u06FF\s]+$/,
      message: 'Invalid characters'
    },
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'This field is required'
  },
  description: {
    maxLength: {
      value: 500,
      message: 'Maximum 500 characters allowed'
    }
  }
});

