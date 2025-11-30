import { BannerStatusEnums } from '@/types/api.types';

export const BannerBadgeColors = {
  [BannerStatusEnums.Active]: 'bg-green-100 text-green-700 hover:bg-green-100',
  [BannerStatusEnums.Inactive]: 'bg-red-100 text-red-700 hover:bg-red-100'
};

