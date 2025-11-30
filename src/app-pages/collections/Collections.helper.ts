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
  title: {
    required: 'Title is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Title is required'
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

