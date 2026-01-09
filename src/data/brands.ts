// ============================================
// BRANDS TYPES - Matching Backend Models
// ============================================

export type BrandStatus = 'active' | 'inactive';

export type Brand = {
  brand_id: number;
  name: string;
  slug: string;
  logo: string;
  status: BrandStatus;
  collection_count: number;
  created_at?: string;
  updated_at?: string;
  // Joined data
  collections?: Array<{
    collection_id: number;
    title: string;
  }>;
};

export const brands: Brand[] = [];

export default brands;
