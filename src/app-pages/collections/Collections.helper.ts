import { TableHeaderProps } from '@/components/Table/Table';

export const collectionsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '15%',
    align: 'left',
  },
  {
    title: 'Title',
    width: '45%',
    align: 'left',
  },
  {
    title: 'Slug',
    width: '30%',
    align: 'left',
  },
  {
    title: 'Actions',
    width: '10%',
    align: 'center',
  },
];

