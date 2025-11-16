'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/common/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Package,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Plus,
  Minus,
  MoreHorizontal,
  Edit,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type StockItem = {
  id: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  lowStockThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
};

const stockData: StockItem[] = [
  {
    id: '1',
    productName: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    category: 'Electronics',
    currentStock: 145,
    lowStockThreshold: 20,
    status: 'in-stock',
    lastUpdated: '2024-01-20',
  },
  {
    id: '2',
    productName: 'Smart Watch Series 5',
    sku: 'SW-005',
    category: 'Electronics',
    currentStock: 89,
    lowStockThreshold: 15,
    status: 'in-stock',
    lastUpdated: '2024-01-19',
  },
  {
    id: '3',
    productName: 'Cotton T-Shirt (Blue)',
    sku: 'CT-BLUE-001',
    category: 'Clothing',
    currentStock: 18,
    lowStockThreshold: 25,
    status: 'low-stock',
    lastUpdated: '2024-01-18',
  },
  {
    id: '4',
    productName: 'Running Shoes - Black',
    sku: 'RS-BLK-042',
    category: 'Footwear',
    currentStock: 12,
    lowStockThreshold: 15,
    status: 'low-stock',
    lastUpdated: '2024-01-17',
  },
  {
    id: '5',
    productName: 'Leather Wallet',
    sku: 'LW-BR-003',
    category: 'Accessories',
    currentStock: 0,
    lowStockThreshold: 10,
    status: 'out-of-stock',
    lastUpdated: '2024-01-16',
  },
  {
    id: '6',
    productName: 'Yoga Mat - Purple',
    sku: 'YM-PUR-001',
    category: 'Sports',
    currentStock: 67,
    lowStockThreshold: 20,
    status: 'in-stock',
    lastUpdated: '2024-01-20',
  },
  {
    id: '7',
    productName: 'USB-C Cable 2M',
    sku: 'USBC-2M-001',
    category: 'Electronics',
    currentStock: 234,
    lowStockThreshold: 50,
    status: 'in-stock',
    lastUpdated: '2024-01-20',
  },
  {
    id: '8',
    productName: 'Denim Jeans - Regular Fit',
    sku: 'DJ-REG-032',
    category: 'Clothing',
    currentStock: 8,
    lowStockThreshold: 15,
    status: 'low-stock',
    lastUpdated: '2024-01-15',
  },
  {
    id: '9',
    productName: 'Backpack - Canvas',
    sku: 'BP-CAN-005',
    category: 'Accessories',
    currentStock: 0,
    lowStockThreshold: 10,
    status: 'out-of-stock',
    lastUpdated: '2024-01-14',
  },
  {
    id: '10',
    productName: 'Protein Shaker Bottle',
    sku: 'PSB-001',
    category: 'Sports',
    currentStock: 156,
    lowStockThreshold: 30,
    status: 'in-stock',
    lastUpdated: '2024-01-19',
  },
];

export default function ProductStockPage() {
  const [stocks, setStocks] = useState(stockData);
  const [editItem, setEditItem] = useState<StockItem | null>(null);
  const [newStock, setNewStock] = useState(0);

  const inStock = stocks.filter(s => s.status === 'in-stock').length;
  const lowStock = stocks.filter(s => s.status === 'low-stock').length;
  const outOfStock = stocks.filter(s => s.status === 'out-of-stock').length;
  const totalItems = stocks.reduce((sum, s) => sum + s.currentStock, 0);

  const handleUpdateStock = () => {
    if (!editItem) return;

    setStocks(prev =>
      prev.map(item => {
        if (item.id === editItem.id) {
          const updatedStock = newStock;
          const status =
            updatedStock === 0
              ? 'out-of-stock'
              : updatedStock < item.lowStockThreshold
              ? 'low-stock'
              : 'in-stock';

          return {
            ...item,
            currentStock: updatedStock,
            status: status as any,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
        }
        return item;
      })
    );

    setEditItem(null);
    setNewStock(0);
  };

  const columns: ColumnDef<StockItem>[] = [
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
      header: 'Product Name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue('productName')}</div>
          <div className="text-sm text-muted-foreground">SKU: {row.original.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue('category')}</Badge>
      ),
    },
    {
      accessorKey: 'currentStock',
      header: 'Current Stock',
      cell: ({ row }) => {
        const stock = row.getValue('currentStock') as number;
        const status = row.original.status;
        const color =
          status === 'out-of-stock'
            ? 'text-red-600'
            : status === 'low-stock'
            ? 'text-amber-600'
            : 'text-green-600';
        return <div className={`font-bold text-lg ${color}`}>{stock}</div>;
      },
    },
    {
      accessorKey: 'lowStockThreshold',
      header: 'Threshold',
      cell: ({ row }) => (
        <div className="text-center text-muted-foreground">
          {row.getValue('lowStockThreshold')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const variants = {
          'in-stock': 'bg-green-100 text-green-800',
          'low-stock': 'bg-amber-100 text-amber-800',
          'out-of-stock': 'bg-red-100 text-red-800',
        };
        const labels = {
          'in-stock': 'In Stock',
          'low-stock': 'Low Stock',
          'out-of-stock': 'Out of Stock',
        };
        return (
          <Badge className={variants[status as keyof typeof variants]}>
            {labels[status as keyof typeof labels]}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'lastUpdated',
      header: 'Last Updated',
      cell: ({ row }) => {
        const date = new Date(row.getValue('lastUpdated'));
        return <div className="text-sm">{date.toLocaleDateString('en-IN')}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const item = row.original;
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
              <DropdownMenuItem
                onClick={() => {
                  setEditItem(item);
                  setNewStock(item.currentStock);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Update Stock
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEditItem(item);
                  setNewStock(item.currentStock + 10);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Quick Add +10
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Stock</h1>
        <p className="text-muted-foreground">Track and update product inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStock}</div>
            <Badge className="mt-2 bg-green-100 text-green-800">Available</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStock}</div>
            <Badge className="mt-2 bg-amber-100 text-amber-800">Warning</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStock}</div>
            <Badge className="mt-2 bg-red-100 text-red-800">Critical</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground mt-1">In inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Management</CardTitle>
          <CardDescription>Monitor and update product inventory levels</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={stocks}
            searchKey="productName"
            searchPlaceholder="Search products..."
          />
        </CardContent>
      </Card>

      {/* Update Stock Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
            <DialogDescription>
              Update the stock quantity for {editItem?.productName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Stock: {editItem?.currentStock}</Label>
              <Label>SKU: {editItem?.sku}</Label>
              <Label>Threshold: {editItem?.lowStockThreshold}</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">New Stock Quantity</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNewStock(Math.max(0, newStock - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="stock"
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNewStock(newStock + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewStock(newStock + 10)}
              >
                +10
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewStock(newStock + 50)}
              >
                +50
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewStock(newStock + 100)}
              >
                +100
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStock}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
