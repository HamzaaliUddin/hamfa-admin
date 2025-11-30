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
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Minimum 3 characters required'
    },
    maxLength: {
      value: 200,
      message: 'Maximum 200 characters allowed'
    },
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'This field is required'
  },
  description: {
    maxLength: {
      value: 500,
      message: 'Maximum 500 characters allowed'
    }
  },
  redirect_url: {
    pattern: {
      value: /^https?:\/\/.+/,
      message: 'Please enter a valid URL'
    }
  }
});

