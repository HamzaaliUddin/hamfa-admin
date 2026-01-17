// ============================================
// CATEGORIES TYPES - Matching Backend Models
// ============================================

export type CategoryStatus = 'active' | 'inactive';

export type Category = {
  category_id: number;
  name: string;
  position: number | null;
  image: string | null;
  show_on_home: boolean;
  status: CategoryStatus;
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
