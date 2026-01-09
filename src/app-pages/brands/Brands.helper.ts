import { TableHeaderProps } from '@/components/Table/Table';

// Brands have: brand_id, name, slug, logo, status, collection_count in backend
export const brandsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '8%',
    align: 'left',
  },
  {
    title: 'Logo',
    width: '12%',
    align: 'left',
  },
  {
    title: 'Name',
    width: '20%',
    align: 'left',
  },
  {
    title: 'Slug',
    width: '18%',
    align: 'left',
  },
  {
    title: 'Collections',
    width: '12%',
    align: 'center',
  },
  {
    title: 'Status',
    width: '12%',
    align: 'center',
  },
  {
    title: 'Actions',
    width: '18%',
    align: 'center',
  },
];

export const brandFormRules = () => ({
  name: {
    required: 'Name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Name is required',
  },
  logo: {
    required: 'Logo is required',
  },
});
