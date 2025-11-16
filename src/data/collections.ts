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

export const collections: Collection[] = [
  {
    id: '1',
    title: 'Featured Collection',
    slug: 'featured',
    description: 'Our most popular products handpicked for you',
    image: '/collections/featured.jpg',
    products: ['1', '2', '3', '5', '8'],
    productCount: 5,
    status: 'active',
    featured: true,
    sortOrder: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-10',
  },
  {
    id: '2',
    title: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Latest products added to our store',
    image: '/collections/new-arrivals.jpg',
    products: ['8', '9', '10'],
    productCount: 3,
    status: 'active',
    featured: true,
    sortOrder: 2,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-12',
  },
  {
    id: '3',
    title: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Top selling products loved by our customers',
    image: '/collections/best-sellers.jpg',
    products: ['1', '2', '3', '4', '5', '6'],
    productCount: 6,
    status: 'active',
    featured: true,
    sortOrder: 3,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-14',
  },
  {
    id: '4',
    title: 'Winter Collection',
    slug: 'winter-collection',
    description: 'Stay warm this winter with our collection',
    image: '/collections/winter.jpg',
    products: ['1', '4'],
    productCount: 2,
    status: 'active',
    featured: false,
    sortOrder: 4,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-05',
  },
  {
    id: '5',
    title: 'Tech Essentials',
    slug: 'tech-essentials',
    description: 'Must-have gadgets and electronics',
    image: '/collections/tech.jpg',
    products: ['2', '3', '8'],
    productCount: 3,
    status: 'active',
    featured: false,
    sortOrder: 5,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-13',
  },
];

export default collections;

