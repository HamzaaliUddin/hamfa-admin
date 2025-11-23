// ============================================
// COLLECTIONS MOCK DATA
// ============================================

export type Collection = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  products: string[]; // Product IDs
  productCount: number;
  status: 'active' | 'inactive';
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export const collections: Collection[] = [];

export default collections;

