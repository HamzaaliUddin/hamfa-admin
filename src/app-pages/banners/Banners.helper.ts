import { TableHeaderProps } from '@/components/Table/Table';

export const bannersColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '8%',
    align: 'left'
  },
  {
    title: 'Image',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Title',
    width: '25%',
    align: 'left'
  },
  {
    title: 'Redirect URL',
    width: '20%',
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

export const bannerFormRules = () => ({
  title: {
    required: 'Title is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Title is required'
  },
  description: {
    required: 'Description is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Description is required'
  }
});

