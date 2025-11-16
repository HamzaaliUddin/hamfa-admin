// ============================================
// BANNERS MOCK DATA
// ============================================

export type Banner = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  redirectUrl: string;
  sortOrder: number;
  startDate?: string;
  endDate?: string;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
};

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Winter Sale 2024',
    description: 'Up to 50% off on winter collection',
    image: '/banners/winter-sale.jpg',
    status: 'active',
    redirectUrl: '/collections/winter-sale',
    sortOrder: 1,
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    clickCount: 1542,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-10',
  },
  {
    id: '2',
    title: 'New Arrivals',
    description: 'Check out our latest products',
    image: '/banners/new-arrivals.jpg',
    status: 'active',
    redirectUrl: '/collections/new-arrivals',
    sortOrder: 2,
    clickCount: 892,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-12',
  },
  {
    id: '3',
    title: 'Tech Gadgets Sale',
    description: 'Best deals on electronics',
    image: '/banners/tech-sale.jpg',
    status: 'active',
    redirectUrl: '/categories/electronics',
    sortOrder: 3,
    startDate: '2024-02-10',
    endDate: '2024-02-25',
    clickCount: 654,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-14',
  },
  {
    id: '4',
    title: 'Free Shipping',
    description: 'Free shipping on orders above $50',
    image: '/banners/free-shipping.jpg',
    status: 'active',
    redirectUrl: '/promotions/free-shipping',
    sortOrder: 4,
    clickCount: 423,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-08',
  },
  {
    id: '5',
    title: 'Valentine Special',
    description: 'Special gifts for your loved ones',
    image: '/banners/valentine.jpg',
    status: 'inactive',
    redirectUrl: '/collections/valentine',
    sortOrder: 5,
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    clickCount: 1205,
    createdAt: '2024-01-25',
    updatedAt: '2024-02-15',
  },
];

export default banners;

