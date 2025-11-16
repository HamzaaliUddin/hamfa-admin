// ============================================
// BRANDS MOCK DATA
// ============================================

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website?: string;
  status: 'active' | 'inactive';
  productCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export const brands: Brand[] = [
  {
    id: '1',
    name: 'Fashion Co',
    slug: 'fashion-co',
    description: 'Premium fashion and lifestyle brand',
    logo: '/brands/fashion-co.png',
    website: 'https://fashionco.example.com',
    status: 'active',
    productCount: 24,
    featured: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-10',
  },
  {
    id: '2',
    name: 'TechSound',
    slug: 'techsound',
    description: 'Audio equipment manufacturer',
    logo: '/brands/techsound.png',
    website: 'https://techsound.example.com',
    status: 'active',
    productCount: 18,
    featured: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-11',
  },
  {
    id: '3',
    name: 'FitTech',
    slug: 'fittech',
    description: 'Fitness technology and wearables',
    logo: '/brands/fittech.png',
    website: 'https://fittech.example.com',
    status: 'active',
    productCount: 15,
    featured: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-12',
  },
  {
    id: '4',
    name: 'BasicWear',
    slug: 'basicwear',
    description: 'Essential clothing for everyone',
    logo: '/brands/basicwear.png',
    status: 'active',
    productCount: 32,
    featured: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-09',
  },
  {
    id: '5',
    name: 'SportFit',
    slug: 'sportfit',
    description: 'Athletic footwear and apparel',
    logo: '/brands/sportfit.png',
    website: 'https://sportfit.example.com',
    status: 'active',
    productCount: 28,
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-13',
  },
  {
    id: '6',
    name: 'TravelGear',
    slug: 'travelgear',
    description: 'Travel bags and accessories',
    logo: '/brands/travelgear.png',
    status: 'active',
    productCount: 12,
    featured: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-02-08',
  },
  {
    id: '7',
    name: 'HydroLife',
    slug: 'hydrolife',
    description: 'Hydration and water bottles',
    logo: '/brands/hydrolife.png',
    status: 'active',
    productCount: 8,
    featured: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-10',
  },
  {
    id: '8',
    name: 'GamePro',
    slug: 'gamepro',
    description: 'Gaming peripherals and accessories',
    logo: '/brands/gamepro.png',
    website: 'https://gamepro.example.com',
    status: 'active',
    productCount: 22,
    featured: true,
    createdAt: '2024-01-22',
    updatedAt: '2024-02-14',
  },
  {
    id: '9',
    name: 'FitLife',
    slug: 'fitlife',
    description: 'Fitness and yoga equipment',
    logo: '/brands/fitlife.png',
    status: 'active',
    productCount: 14,
    featured: false,
    createdAt: '2024-01-25',
    updatedAt: '2024-02-11',
  },
  {
    id: '10',
    name: 'StyleVision',
    slug: 'stylevision',
    description: 'Eyewear and sunglasses',
    logo: '/brands/stylevision.png',
    website: 'https://stylevision.example.com',
    status: 'active',
    productCount: 19,
    featured: false,
    createdAt: '2024-01-28',
    updatedAt: '2024-02-12',
  },
];

export default brands;

