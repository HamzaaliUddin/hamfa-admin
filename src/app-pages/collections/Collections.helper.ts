import { TableHeaderProps } from '@/components/Table/Table';

// Collections have: collection_id, title, slug, image, category_id, show_in_nav in backend
export const collectionsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Image',
    width: '15%',
    align: 'left',
  },
  {
    title: 'Title',
    width: '25%',
    align: 'left',
  },
  {
    title: 'Slug',
    width: '20%',
    align: 'left',
  },
  {
    title: 'Show in Nav',
    width: '15%',
    align: 'center',
  },
  {
    title: 'Actions',
    width: '15%',
    align: 'center',
  },
];

export const collectionFormRules = () => ({
  title: {
    required: 'Title is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Title is required',
  },
  image: {
    required: 'Image is required',
  },
});
