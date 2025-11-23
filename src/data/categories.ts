// ============================================
// CATEGORIES MOCK DATA
// ============================================

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  image: string;
  icon?: string;
  status: 'active' | 'inactive';
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
};

export const categories: Category[] = [];

export default categories;

