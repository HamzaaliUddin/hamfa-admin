// ============================================
// CATEGORIES TYPES - Matching Backend Models
// ============================================

export type Category = {
  category_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  // Joined data
  collections?: Array<{
    collection_id: number;
    title: string;
  }>;
};

export const categories: Category[] = [];

export default categories;
