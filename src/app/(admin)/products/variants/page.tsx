'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Package,
  Palette,
  Ruler,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ProductVariant = {
  id: string;
  productName: string;
  variantType: 'size' | 'color' | 'material' | 'style';
  variantValue: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
};

const variantData: ProductVariant[] = [
  // T-Shirt Variants
  {
    id: '1',
    productName: 'Cotton T-Shirt',
    variantType: 'size',
    variantValue: 'Small',
    sku: 'CT-S-001',
    price: 499,
    stock: 45,
    status: 'active',
  },
  {
    id: '2',
    productName: 'Cotton T-Shirt',
    variantType: 'size',
    variantValue: 'Medium',
    sku: 'CT-M-001',
    price: 499,
    stock: 67,
    status: 'active',
  },
  {
    id: '3',
    productName: 'Cotton T-Shirt',
    variantType: 'size',
    variantValue: 'Large',
    sku: 'CT-L-001',
    price: 499,
    stock: 52,
    status: 'active',
  },
  {
    id: '4',
    productName: 'Cotton T-Shirt',
    variantType: 'color',
    variantValue: 'Blue',
    sku: 'CT-BLUE-001',
    price: 499,
    stock: 18,
    status: 'active',
  },
  {
    id: '5',
    productName: 'Cotton T-Shirt',
    variantType: 'color',
    variantValue: 'Red',
    sku: 'CT-RED-001',
    price: 499,
    stock: 34,
    status: 'active',
  },
  {
    id: '6',
    productName: 'Cotton T-Shirt',
    variantType: 'color',
    variantValue: 'Black',
    sku: 'CT-BLK-001',
    price: 499,
    stock: 89,
    status: 'active',
  },
  
  // Running Shoes Variants
  {
    id: '7',
    productName: 'Running Shoes',
    variantType: 'size',
    variantValue: 'UK 7',
    sku: 'RS-UK7-001',
    price: 2999,
    stock: 23,
    status: 'active',
  },
  {
    id: '8',
    productName: 'Running Shoes',
    variantType: 'size',
    variantValue: 'UK 8',
    sku: 'RS-UK8-001',
    price: 2999,
    stock: 34,
    status: 'active',
  },
  {
    id: '9',
    productName: 'Running Shoes',
    variantType: 'size',
    variantValue: 'UK 9',
    sku: 'RS-UK9-001',
    price: 2999,
    stock: 45,
    status: 'active',
  },
  {
    id: '10',
    productName: 'Running Shoes',
    variantType: 'color',
    variantValue: 'Black',
    sku: 'RS-BLK-042',
    price: 2999,
    stock: 12,
    status: 'active',
  },
  {
    id: '11',
    productName: 'Running Shoes',
    variantType: 'color',
    variantValue: 'White',
    sku: 'RS-WHT-042',
    price: 2999,
    stock: 28,
    status: 'active',
  },

  // Smart Watch Variants
  {
    id: '12',
    productName: 'Smart Watch Series 5',
    variantType: 'material',
    variantValue: 'Aluminum',
    sku: 'SW5-ALU-001',
    price: 24999,
    stock: 45,
    status: 'active',
  },
  {
    id: '13',
    productName: 'Smart Watch Series 5',
    variantType: 'material',
    variantValue: 'Stainless Steel',
    sku: 'SW5-SS-001',
    price: 34999,
    stock: 23,
    status: 'active',
  },
  {
    id: '14',
    productName: 'Smart Watch Series 5',
    variantType: 'color',
    variantValue: 'Space Gray',
    sku: 'SW5-SG-001',
    price: 24999,
    stock: 34,
    status: 'active',
  },
  {
    id: '15',
    productName: 'Smart Watch Series 5',
    variantType: 'color',
    variantValue: 'Gold',
    sku: 'SW5-GLD-001',
    price: 27999,
    stock: 12,
    status: 'active',
  },

  // Backpack Variants
  {
    id: '16',
    productName: 'Backpack',
    variantType: 'style',
    variantValue: 'Canvas',
    sku: 'BP-CAN-005',
    price: 1999,
    stock: 0,
    status: 'inactive',
  },
  {
    id: '17',
    productName: 'Backpack',
    variantType: 'style',
    variantValue: 'Leather',
    sku: 'BP-LTH-005',
    price: 3999,
    stock: 18,
    status: 'active',
  },
  {
    id: '18',
    productName: 'Backpack',
    variantType: 'color',
    variantValue: 'Brown',
    sku: 'BP-BRN-005',
    price: 2499,
    stock: 34,
    status: 'active',
  },
];

export default function ProductVariantsPage() {
  const [variants, setVariants] = useState(variantData);

  // Calculate stats
  const totalVariants = variants.length;
  const activeVariants = variants.filter(v => v.status === 'active').length;
  const outOfStock = variants.filter(v => v.stock === 0).length;
  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);

  // Group by variant type
  const variantsByType = {
    size: variants.filter(v => v.variantType === 'size').length,
    color: variants.filter(v => v.variantType === 'color').length,
    material: variants.filter(v => v.variantType === 'material').length,
    style: variants.filter(v => v.variantType === 'style').length,
  };

  const columns: ColumnDef<ProductVariant>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'productName',
      header: 'Product',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue('productName')}</div>
          <div className="text-sm text-muted-foreground">SKU: {row.original.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: 'variantType',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('variantType') as string;
        const icons = {
          size: <Ruler className="h-3 w-3" />,
          color: <Palette className="h-3 w-3" />,
          material: <Package className="h-3 w-3" />,
          style: <Copy className="h-3 w-3" />,
        };
        return (
          <Badge variant="outline" className="flex items-center gap-1 w-fit">
            {icons[type as keyof typeof icons]}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'variantValue',
      header: 'Value',
      cell: ({ row }) => {
        const type = row.original.variantType;
        const value = row.getValue('variantValue') as string;
        
        if (type === 'color') {
          const colorMap: Record<string, string> = {
            'Blue': 'bg-blue-500',
            'Red': 'bg-red-500',
            'Black': 'bg-black',
            'White': 'bg-white border',
            'Brown': 'bg-amber-700',
            'Space Gray': 'bg-gray-600',
            'Gold': 'bg-yellow-500',
          };
          return (
            <div className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded ${colorMap[value] || 'bg-gray-300'}`} />
              <span className="font-medium">{value}</span>
            </div>
          );
        }
        
        return <span className="font-medium">{value}</span>;
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = row.getValue('price') as number;
        return (
          <div className="font-medium">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(price)}
          </div>
        );
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        const color = stock === 0 ? 'text-red-600' : stock < 20 ? 'text-amber-600' : 'text-green-600';
        return <div className={`font-bold ${color}`}>{stock}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const variant = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Variant
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Variants</h1>
          <p className="text-muted-foreground">Manage product sizes, colors, and variations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVariants}</div>
            <p className="text-xs text-muted-foreground">{activeVariants} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
            <p className="text-xs text-muted-foreground">All variants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStock}</div>
            <Badge variant="destructive" className="mt-1">Critical</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Variant Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Size, Color, Material, Style</p>
          </CardContent>
        </Card>
      </div>

      {/* Variant Types Breakdown */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Size Variants</CardTitle>
            <Ruler className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{variantsByType.size}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Color Variants</CardTitle>
            <Palette className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{variantsByType.color}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Variants</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{variantsByType.material}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Style Variants</CardTitle>
            <Copy className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{variantsByType.style}</div>
          </CardContent>
        </Card>
      </div>

      {/* Variants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Variant Management</CardTitle>
          <CardDescription>All product variants with their specifications and stock levels</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={variants}
            searchKey="productName"
            searchPlaceholder="Search variants..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
