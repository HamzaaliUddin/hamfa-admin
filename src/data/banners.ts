// ============================================
// BANNERS MOCK DATA
// ============================================

export type Banner = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  redirectUrl: string;
  sortOrder: number;
  startDate?: string;
  endDate?: string;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
};

export const banners: Banner[] = [];

export default banners;

