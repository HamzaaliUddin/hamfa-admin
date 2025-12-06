import { TableHeaderProps } from '@/components/Table/Table';

export const notificationsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: '',
    width: '5%',
    align: 'center',
  },
  {
    title: 'ID',
    width: '7%',
    align: 'left',
  },
  {
    title: 'Title',
    width: '18%',
    align: 'left',
  },
  {
    title: 'Description',
    width: '33%',
    align: 'left',
  },
  {
    title: 'Type',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Status',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Actions',
    width: '17%',
    align: 'center',
  },
];

