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
    required: 'Title is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Title is required'
  },
  description: {
    required: 'Description is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Description is required'
  },
  price: {
    required: 'Price is required',
    min: {
      value: 0,
      message: 'Price must be 0 or greater'
    }
  },
  sku: {
    required: 'SKU is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'SKU is required'
  }
});

