export type TableHeaderProps = {
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
};

export const bannersColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'Image',
    width: '10%',
    align: 'center'
  },
  {
    title: 'Title',
    width: '30%'
  },
  {
    title: 'Status',
    width: '15%',
    align: 'center'
  },
  {
    title: 'Actions',
    width: '15%',
    align: 'center'
  }
];

export const BannerStatusColors: Record<string, string> = {
  active: 'text-green-600',
  inactive: 'text-gray-500',
  draft: 'text-yellow-600'
};

