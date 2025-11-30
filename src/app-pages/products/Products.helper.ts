import { TableHeaderProps } from '@/components/Table/Table';

export const productsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '8%',
    align: 'left'
  },
  {
    title: 'Image',
    width: '10%',
    align: 'left'
  },
  {
    title: 'Title',
    width: '20%',
    align: 'left'
  },
  {
    title: 'SKU',
    width: '12%',
    align: 'left'
  },
  {
    title: 'Price',
    width: '10%',
    align: 'left'
  },
  {
    title: 'Stock',
    width: '10%',
    align: 'left'
  },
  {
    title: 'Status',
    width: '10%',
    align: 'left'
  },
  {
    title: 'Actions',
    width: '20%',
    align: 'center'
  }
];

export const productFormRules = () => ({
  title: {
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Minimum 3 characters required'
    },
    maxLength: {
      value: 200,
      message: 'Maximum 200 characters allowed'
    },
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'This field is required'
  },
  description: {
    maxLength: {
      value: 2000,
      message: 'Maximum 2000 characters allowed'
    }
  },
  price: {
    required: 'Price is required',
    min: {
      value: 0,
      message: 'Price must be greater than 0'
    }
  },
  sku: {
    required: 'SKU is required',
    minLength: {
      value: 2,
      message: 'Minimum 2 characters required'
    }
  }
});

