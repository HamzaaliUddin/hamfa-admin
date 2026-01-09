import { TableHeaderProps } from '@/components/Table/Table';

// Products have: product_id, title, slug, description, sku, image, images, price, stock, 
// low_stock_threshold, brand_id, collection_id, status, size, product_type in backend
export const productsColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'ID',
    width: '6%',
    align: 'left',
  },
  {
    title: 'Image',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Title',
    width: '18%',
    align: 'left',
  },
  {
    title: 'SKU',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Price',
    width: '8%',
    align: 'left',
  },
  {
    title: 'Stock',
    width: '8%',
    align: 'left',
  },
  {
    title: 'Size',
    width: '8%',
    align: 'left',
  },
  {
    title: 'Type',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Status',
    width: '10%',
    align: 'left',
  },
  {
    title: 'Actions',
    width: '12%',
    align: 'center',
  },
];

export const productFormRules = () => ({
  title: {
    required: 'Title is required',
    validate: (value: string) => (value && String(value).trim()?.length > 0) || 'Title is required',
  },
  description: {
    required: 'Description is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Description is required',
  },
  price: {
    required: 'Price is required',
    min: {
      value: 0,
      message: 'Price must be 0 or greater',
    },
  },
  stock: {
    required: 'Stock is required',
    min: {
      value: 0,
      message: 'Stock must be 0 or greater',
    },
  },
  brand_id: {
    required: 'Brand is required',
  },
  collection_id: {
    required: 'Collection is required',
  },
  size: {
    required: 'Size is required',
  },
  product_type: {
    required: 'Product type is required',
  },
  image: {
    required: 'Image is required',
  },
});
