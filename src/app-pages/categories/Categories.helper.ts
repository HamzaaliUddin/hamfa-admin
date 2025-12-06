import { TableHeaderProps } from '@/components/Table/Table';

export const categoriesColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Image',
    width: '20%',
    align: 'left',
  },
  {
    title: 'Name',
    width: '30%',
    align: 'left',
  },
  {
    title: 'Status',
    width: '20%',
    align: 'left',
  },
  {
    title: 'Actions',
    width: '30%',
    align: 'center',
  },
];

