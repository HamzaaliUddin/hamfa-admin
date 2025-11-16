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

export const products: Product[] = [
  {
    id: '1',
    title: 'Premium Leather Jacket',
    description: 'High-quality genuine leather jacket with modern design',
    sku: 'LJ-001',
    image: '/products/jacket-1.jpg',
    images: ['/products/jacket-1.jpg', '/products/jacket-2.jpg'],
    price: 299.99,
    comparePrice: 399.99,
    cost: 150.00,
    stock: 45,
    lowStockThreshold: 10,
    brand: 'Fashion Co',
    brandId: '1',
    category: 'Clothing',
    categoryId: '1',
    tags: ['winter', 'leather', 'jacket', 'premium'],
    status: 'active',
    featured: true,
    hasVariants: true,
    variants: [
      {
        id: 'v1',
        name: 'Black - Small',
        sku: 'LJ-001-BK-S',
        price: 299.99,
        stock: 12,
        attributes: { size: 'S', color: 'Black' },
      },
      {
        id: 'v2',
        name: 'Black - Medium',
        sku: 'LJ-001-BK-M',
        price: 299.99,
        stock: 15,
        attributes: { size: 'M', color: 'Black' },
      },
      {
        id: 'v3',
        name: 'Brown - Large',
        sku: 'LJ-001-BR-L',
        price: 299.99,
        stock: 18,
        attributes: { size: 'L', color: 'Brown' },
      },
    ],
    weight: 1.5,
    dimensions: { length: 60, width: 50, height: 5 },
    createdAt: '2024-01-15',
    updatedAt: '2024-02-10',
  },
  {
    id: '2',
    title: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones',
    sku: 'WH-001',
    image: '/products/headphones-1.jpg',
    images: ['/products/headphones-1.jpg'],
    price: 149.99,
    comparePrice: 199.99,
    cost: 75.00,
    stock: 120,
    lowStockThreshold: 20,
    brand: 'TechSound',
    brandId: '2',
    category: 'Electronics',
    categoryId: '2',
    tags: ['audio', 'wireless', 'bluetooth', 'headphones'],
    status: 'active',
    featured: true,
    hasVariants: false,
    weight: 0.3,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-12',
  },
  {
    id: '3',
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals with advanced sensors',
    sku: 'FW-001',
    image: '/products/watch-1.jpg',
    images: ['/products/watch-1.jpg', '/products/watch-2.jpg'],
    price: 199.99,
    stock: 85,
    lowStockThreshold: 15,
    brand: 'FitTech',
    brandId: '3',
    category: 'Electronics',
    categoryId: '2',
    tags: ['fitness', 'smartwatch', 'health', 'sports'],
    status: 'active',
    featured: true,
    hasVariants: true,
    variants: [
      {
        id: 'v4',
        name: 'Black Band',
        sku: 'FW-001-BK',
        price: 199.99,
        stock: 40,
        attributes: { color: 'Black' },
      },
      {
        id: 'v5',
        name: 'Blue Band',
        sku: 'FW-001-BL',
        price: 199.99,
        stock: 45,
        attributes: { color: 'Blue' },
      },
    ],
    weight: 0.05,
    createdAt: '2024-01-25',
    updatedAt: '2024-02-08',
  },
  {
    id: '4',
    title: 'Cotton T-Shirt Pack',
    description: '100% premium cotton, pack of 3',
    sku: 'TS-001',
    image: '/products/tshirt-1.jpg',
    images: ['/products/tshirt-1.jpg'],
    price: 39.99,
    comparePrice: 59.99,
    cost: 15.00,
    stock: 200,
    lowStockThreshold: 30,
    brand: 'BasicWear',
    brandId: '4',
    category: 'Clothing',
    categoryId: '1',
    tags: ['tshirt', 'cotton', 'basic', 'pack'],
    status: 'active',
    featured: false,
    hasVariants: true,
    variants: [
      {
        id: 'v6',
        name: 'White - Medium',
        sku: 'TS-001-WH-M',
        price: 39.99,
        stock: 80,
        attributes: { size: 'M', color: 'White' },
      },
      {
        id: 'v7',
        name: 'Black - Large',
        sku: 'TS-001-BK-L',
        price: 39.99,
        stock: 120,
        attributes: { size: 'L', color: 'Black' },
      },
    ],
    weight: 0.4,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-11',
  },
  {
    id: '5',
    title: 'Running Shoes',
    description: 'Comfortable running shoes with superior cushioning',
    sku: 'RS-001',
    image: '/products/shoes-1.jpg',
    images: ['/products/shoes-1.jpg', '/products/shoes-2.jpg'],
    price: 89.99,
    stock: 65,
    lowStockThreshold: 10,
    brand: 'SportFit',
    brandId: '5',
    category: 'Footwear',
    categoryId: '3',
    tags: ['shoes', 'running', 'sports', 'fitness'],
    status: 'active',
    featured: true,
    hasVariants: true,
    variants: [
      {
        id: 'v8',
        name: 'Size 9',
        sku: 'RS-001-9',
        price: 89.99,
        stock: 25,
        attributes: { size: '9' },
      },
      {
        id: 'v9',
        name: 'Size 10',
        sku: 'RS-001-10',
        price: 89.99,
        stock: 40,
        attributes: { size: '10' },
      },
    ],
    weight: 0.8,
    createdAt: '2024-02-03',
    updatedAt: '2024-02-13',
  },
  {
    id: '6',
    title: 'Laptop Backpack',
    description: 'Spacious backpack with laptop compartment',
    sku: 'BP-001',
    image: '/products/backpack-1.jpg',
    images: ['/products/backpack-1.jpg'],
    price: 49.99,
    stock: 150,
    lowStockThreshold: 25,
    brand: 'TravelGear',
    brandId: '6',
    category: 'Accessories',
    categoryId: '4',
    tags: ['backpack', 'laptop', 'travel', 'bag'],
    status: 'active',
    featured: false,
    hasVariants: false,
    weight: 0.9,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-14',
  },
  {
    id: '7',
    title: 'Stainless Steel Water Bottle',
    description: 'Insulated bottle keeps drinks cold for 24 hours',
    sku: 'WB-001',
    image: '/products/bottle-1.jpg',
    images: ['/products/bottle-1.jpg'],
    price: 24.99,
    stock: 8,
    lowStockThreshold: 10,
    brand: 'HydroLife',
    brandId: '7',
    category: 'Accessories',
    categoryId: '4',
    tags: ['bottle', 'water', 'insulated', 'stainless'],
    status: 'active',
    featured: false,
    hasVariants: false,
    weight: 0.4,
    createdAt: '2024-02-07',
    updatedAt: '2024-02-15',
  },
  {
    id: '8',
    title: 'Gaming Mouse',
    description: 'High-precision RGB gaming mouse',
    sku: 'GM-001',
    image: '/products/mouse-1.jpg',
    images: ['/products/mouse-1.jpg', '/products/mouse-2.jpg'],
    price: 59.99,
    stock: 95,
    lowStockThreshold: 15,
    brand: 'GamePro',
    brandId: '8',
    category: 'Electronics',
    categoryId: '2',
    tags: ['gaming', 'mouse', 'rgb', 'computer'],
    status: 'active',
    featured: true,
    hasVariants: false,
    weight: 0.15,
    createdAt: '2024-02-08',
    updatedAt: '2024-02-14',
  },
  {
    id: '9',
    title: 'Yoga Mat',
    description: 'Non-slip exercise yoga mat',
    sku: 'YM-001',
    image: '/products/yoga-1.jpg',
    images: ['/products/yoga-1.jpg'],
    price: 29.99,
    stock: 0,
    lowStockThreshold: 20,
    brand: 'FitLife',
    brandId: '9',
    category: 'Sports',
    categoryId: '5',
    tags: ['yoga', 'mat', 'fitness', 'exercise'],
    status: 'out_of_stock',
    featured: false,
    hasVariants: false,
    weight: 1.2,
    createdAt: '2024-02-09',
    updatedAt: '2024-02-15',
  },
  {
    id: '10',
    title: 'Sunglasses UV Protection',
    description: 'Polarized sunglasses with 100% UV protection',
    sku: 'SG-001',
    image: '/products/sunglasses-1.jpg',
    images: ['/products/sunglasses-1.jpg'],
    price: 79.99,
    stock: 110,
    lowStockThreshold: 15,
    brand: 'StyleVision',
    brandId: '10',
    category: 'Accessories',
    categoryId: '4',
    tags: ['sunglasses', 'uv', 'fashion', 'eyewear'],
    status: 'active',
    featured: false,
    hasVariants: false,
    weight: 0.1,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-15',
  },
];

export default products;

