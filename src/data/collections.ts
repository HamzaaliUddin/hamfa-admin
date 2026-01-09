// ============================================
// COLLECTIONS TYPES - Matching Backend Models
// ============================================

export type Collection = {
  collection_id: number;
  title: string;
  slug: string;
  image: string;
  category_id?: number;
  show_in_nav?: boolean;
  created_at?: string;
  updated_at?: string;
  // Joined data
  category?: {
    category_id: number;
    name: string;
  };
  products_count?: number;
};

export const collections: Collection[] = [];

export default collections;
