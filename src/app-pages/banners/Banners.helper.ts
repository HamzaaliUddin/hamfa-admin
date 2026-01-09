import { TableHeaderProps } from '@/components/Table/Table';

// Banner only has banner_id and image in backend
export const bannersColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '15%',
    align: 'left'
  },
  {
    title: 'Image',
    width: '55%',
    align: 'left'
  },
  {
    title: 'Actions',
    width: '30%',
    align: 'center'
  }
];

export const bannerFormRules = () => ({
  image: {
    required: 'Image is required'
  }
});
