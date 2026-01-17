import { TableHeaderProps } from '@/components/Table/Table';

export const categoriesColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '6%',
    align: 'left',
  },
  {
    title: 'Name',
    width: '18%',
    align: 'left',
  },
  {
    title: 'Slug',
    width: '18%',
    align: 'left',
  },
  {
    title: 'Position',
    width: '8%',
    align: 'center',
  },
  {
    title: 'Show on Home',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Status',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Actions',
    width: '30%',
    align: 'center',
  },
];

export const categoryFormRules = () => ({
  name: {
    required: 'Name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Name is required',
  },
});
