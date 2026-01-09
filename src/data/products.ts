// ============================================
// PRODUCTS TYPES - Matching Backend Models
// ============================================

export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';
export type ProductSize = 'small' | 'medium' | 'large';
export type ProductType = 'stitched' | 'unstitched';

export type Product = {
  product_id: number;
  title: string;
  slug: string;
  description: string;
  sku: string;
  image: string;
  images: string[];
  price: number;
  stock: number;
  low_stock_threshold: number;
  brand_id: number;
  collection_id: number;
  status: ProductStatus;
  size: ProductSize;
  product_type: ProductType;
  created_at?: string;
  updated_at?: string;
  // Joined data
  brand?: {
    brand_id: number;
    name: string;
  };
  collection?: {
    collection_id: number;
    title: string;
  };
};

export const products: Product[] = [];

export default products;
