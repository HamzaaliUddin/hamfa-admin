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

export const categories: Category[] = [
  {
    id: '1',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for everyone',
    parentId: null,
    image: '/categories/clothing.jpg',
    icon: 'shirt',
    status: 'active',
    sortOrder: 1,
    productCount: 45,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-10',
  },
  {
    id: '2',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest tech gadgets and devices',
    parentId: null,
    image: '/categories/electronics.jpg',
    icon: 'laptop',
    status: 'active',
    sortOrder: 2,
    productCount: 78,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-12',
  },
  {
    id: '3',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Shoes and sandals for all occasions',
    parentId: null,
    image: '/categories/footwear.jpg',
    icon: 'shoe',
    status: 'active',
    sortOrder: 3,
    productCount: 32,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-11',
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with accessories',
    parentId: null,
    image: '/categories/accessories.jpg',
    icon: 'watch',
    status: 'active',
    sortOrder: 4,
    productCount: 56,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-13',
  },
  {
    id: '5',
    name: 'Sports',
    slug: 'sports',
    description: 'Sports and fitness equipment',
    parentId: null,
    image: '/categories/sports.jpg',
    icon: 'dumbbell',
    status: 'active',
    sortOrder: 5,
    productCount: 23,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-09',
  },
  // Subcategories
  {
    id: '101',
    name: "Men's Clothing",
    slug: 'mens-clothing',
    description: 'Clothing for men',
    parentId: '1',
    image: '/categories/mens-clothing.jpg',
    status: 'active',
    sortOrder: 1,
    productCount: 25,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-10',
  },
  {
    id: '102',
    name: "Women's Clothing",
    slug: 'womens-clothing',
    description: 'Clothing for women',
    parentId: '1',
    image: '/categories/womens-clothing.jpg',
    status: 'active',
    sortOrder: 2,
    productCount: 20,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-10',
  },
  {
    id: '201',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest smartphones and accessories',
    parentId: '2',
    image: '/categories/smartphones.jpg',
    status: 'active',
    sortOrder: 1,
    productCount: 35,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-12',
  },
  {
    id: '202',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Laptops and notebooks',
    parentId: '2',
    image: '/categories/laptops.jpg',
    status: 'active',
    sortOrder: 2,
    productCount: 28,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-12',
  },
  {
    id: '203',
    name: 'Audio',
    slug: 'audio',
    description: 'Headphones, speakers, and audio devices',
    parentId: '2',
    image: '/categories/audio.jpg',
    status: 'active',
    sortOrder: 3,
    productCount: 15,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-11',
  },
];

export default categories;

