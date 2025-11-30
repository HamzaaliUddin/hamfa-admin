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
    required: 'Name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Name is required'
  },
  slug: {
    required: 'Slug is required',
    pattern: {
      value: /^[a-z0-9-]+$/,
      message: 'Slug must be lowercase letters, numbers, and hyphens only'
    },
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Slug is required'
  },
  description: {
    required: 'Description is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Description is required'
  }
});

