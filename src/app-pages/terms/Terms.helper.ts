import { TableHeaderProps } from '@/components/Table/Table';

export const termsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '8%',
    align: 'left'
  },
  {
    title: 'Title',
    width: '25%',
    align: 'left'
  },
  {
    title: 'Type',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Version',
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
    width: '28%',
    align: 'center'
  }
];

