import { TableHeaderProps } from '@/components/Table/Table';

export const collectionsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '10%',
    align: 'left'
  },
  {
    title: 'Image',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Name',
    width: '25%',
    align: 'left'
  },
  {
    title: 'Products',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Status',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Actions',
    width: '20%',
    align: 'center'
  }
];

export const collectionFormRules = () => ({
  name: {
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Minimum 3 characters required'
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

