// ============================================
// BRANDS MOCK DATA
// ============================================

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website?: string;
  status: 'active' | 'inactive';
  productCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export const brands: Brand[] = [];

export default brands;

