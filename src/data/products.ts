// ============================================
// PRODUCTS MOCK DATA
// ============================================

export type Product = {
  id: string;
  title: string;
  description: string;
  sku: string;
  image: string;
  images: string[];
  price: number;
  comparePrice?: number;
  cost?: number;
  stock: number;
  lowStockThreshold: number;
  brand: string;
  brandId: string;
  category: string;
  categoryId: string;
  tags: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  featured: boolean;
  hasVariants: boolean;
  variants?: ProductVariant[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
  };
};

export const products: Product[] = [];

export default products;

