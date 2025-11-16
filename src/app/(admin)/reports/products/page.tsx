'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/data-table';
import { Package, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { products } from '@/data/products';

// Calculate product statistics
const calculateProductStats = () => {
  const active = products.filter(p => p.status === 'active').length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
  
  return {
    total: products.length,
    active,
    outOfStock,
    lowStock,
    totalStock,
    avgPrice,
  };
};

const stats = calculateProductStats();

// Top products by stock value
const topByValue = products
  .map(p => ({
    id: p.id,
    title: p.title,
    sku: p.sku,
    stock: p.stock,
    price: p.price,
    stockValue: p.stock * p.price,
    status: p.status,
  }))
  .sort((a, b) => b.stockValue - a.stockValue)
  .slice(0, 10);

// Low stock products
const lowStockProducts = products
  .filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold)
  .map(p => ({
    title: p.title,
    sku: p.sku,
    stock: p.stock,
    threshold: p.lowStockThreshold,
    price: p.price,
  }));

// Out of stock products
const outOfStockProducts = products
  .filter(p => p.stock === 0)
  .map(p => ({
    title: p.title,
    sku: p.sku,
    price: p.price,
    status: p.status,
  }));

export default function ProductPerformanceReportPage() {
  const valueColumns = [
    {
      accessorKey: 'title',
      header: 'Product',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-sm text-muted-foreground">{row.original.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }: any) => (
        <Badge variant="secondary">{row.original.stock} units</Badge>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }: any) => (
        <div className="font-medium">${row.original.price.toFixed(2)}</div>
      ),
    },
    {
      accessorKey: 'stockValue',
      header: 'Stock Value',
      cell: ({ row }: any) => (
        <div className="font-semibold text-green-600">
          ${row.original.stockValue.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
  ];

  const lowStockColumns = [
    {
      accessorKey: 'title',
      header: 'Product',
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'stock',
      header: 'Current Stock',
      cell: ({ row }: any) => (
        <Badge variant="destructive">{row.original.stock} units</Badge>
      ),
    },
    {
      accessorKey: 'threshold',
      header: 'Threshold',
      cell: ({ row }: any) => (
        <span className="text-muted-foreground">{row.original.threshold} units</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Product Performance</h1>
        <p className="text-muted-foreground">Analyze product sales and inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              {stats.active} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${topByValue.reduce((sum, p) => sum + p.stockValue, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
            <p className="text-xs text-yellow-600 mt-1">
              Need restock soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            <p className="text-xs text-red-600 mt-1">
              Immediate action needed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>Stock statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Units in Stock</div>
              <div className="text-3xl font-bold">{stats.totalStock}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average Product Price</div>
              <div className="text-3xl font-bold">${stats.avgPrice.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Health</CardTitle>
            <CardDescription>Inventory status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                In Stock
              </span>
              <span className="font-semibold">
                {stats.total - stats.outOfStock - stats.lowStock} products
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                Low Stock
              </span>
              <span className="font-semibold">{stats.lowStock} products</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                Out of Stock
              </span>
              <span className="font-semibold">{stats.outOfStock} products</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products by Stock Value */}
      <Card>
        <CardHeader>
          <CardTitle>Products by Stock Value</CardTitle>
          <CardDescription>Highest value inventory items</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={valueColumns} data={topByValue} searchKey="title" />
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Products that need restocking soon</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={lowStockColumns} data={lowStockProducts} searchKey="title" />
          </CardContent>
        </Card>
      )}

      {/* Out of Stock */}
      {outOfStockProducts.length > 0 && (
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <TrendingDown className="h-5 w-5" />
              Out of Stock Products
            </CardTitle>
            <CardDescription>Products unavailable for sale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {outOfStockProducts.map((product) => (
                <div key={product.sku} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-muted-foreground">{product.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${product.price.toFixed(2)}</div>
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
