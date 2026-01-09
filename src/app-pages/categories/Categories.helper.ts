import { TableHeaderProps } from '@/components/Table/Table';

// Categories only have: category_id, name in backend
export const categoriesColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '20%',
    align: 'left',
  },
  {
    title: 'Name',
    width: '50%',
    align: 'left',
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
