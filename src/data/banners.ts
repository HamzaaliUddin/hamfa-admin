// ============================================
// BANNERS TYPES - Matching Backend Models
// ============================================

export type Banner = {
  banner_id: number;
  image: string;
  created_at?: string;
  updated_at?: string;
};

export const banners: Banner[] = [];

export default banners;
