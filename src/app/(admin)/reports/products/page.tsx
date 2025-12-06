'use client';

import { DataTable } from '@/components/common/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProductsReport } from '@/queries/reports';
import { AlertCircle, Package, TrendingDown, TrendingUp } from 'lucide-react';

export default function ProductPerformanceReportPage() {
  const { data: productsData, isLoading } = useGetProductsReport();
  const report = productsData?.body?.data;

  const valueColumns = [
    {
      accessorKey: 'title',
      header: 'Product',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-muted-foreground text-sm">{row.original.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }: any) => (
        <Badge variant="secondary">{row.original.stock || 0} units</Badge>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }: any) => (
        <div className="font-medium">Rs {Number(row.original.price || 0).toFixed(2)}</div>
      ),
    },
    {
      accessorKey: 'total_sold',
      header: 'Sold',
      cell: ({ row }: any) => <span>{row.original.total_sold || 0} units</span>,
    },
    {
      accessorKey: 'revenue',
      header: 'Revenue',
      cell: ({ row }: any) => (
        <div className="font-semibold text-green-600">
          Rs {Number(row.original.revenue || 0).toFixed(2)}
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
        <Badge variant="destructive">{row.original.stock || 0} units</Badge>
      ),
    },
    {
      accessorKey: 'low_stock_threshold',
      header: 'Threshold',
      cell: ({ row }: any) => (
        <span className="text-muted-foreground">{row.original.low_stock_threshold} units</span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const stats = {
    total: report?.totalProducts || 0,
    active: report?.activeProducts || 0,
    outOfStock: report?.outOfStockProducts || 0,
    lowStock: report?.lowStockProducts || 0,
    totalStockValue: report?.totalStockValue || 0,
    totalStockUnits: report?.totalStockUnits || 0,
    avgPrice: report?.averagePrice || 0,
  };

  const stockHealth = report?.stockHealth || { inStock: 0, lowStock: 0, outOfStock: 0 };
  const topSellingProducts = report?.topSellingProducts || [];
  const lowStockAlerts = report?.lowStockAlerts || [];
  const outOfStockList = report?.outOfStockList || [];
  const categoryPerformance = report?.categoryPerformance || [];

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
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Package className="h-4 w-4 text-blue-500" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
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
            <div className="text-2xl font-bold">Rs {stats.totalStockValue.toFixed(2)}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              {stats.totalStockUnits} units in stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
            <p className="mt-1 text-xs text-yellow-600">Need restock soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            <p className="mt-1 text-xs text-red-600">Immediate action needed</p>
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
              <div className="text-muted-foreground text-sm">Total Units in Stock</div>
              <div className="text-3xl font-bold">{stats.totalStockUnits}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Average Product Price</div>
              <div className="text-3xl font-bold">Rs {stats.avgPrice.toFixed(2)}</div>
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
              <span className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                In Stock
              </span>
              <span className="font-semibold">{stockHealth.inStock} products</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                Low Stock
              </span>
              <span className="font-semibold">{stockHealth.lowStock} products</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                Out of Stock
              </span>
              <span className="font-semibold">{stockHealth.outOfStock} products</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      {categoryPerformance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Sales by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((cat: any) => (
                <div key={cat.category_id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{cat.category_name}</div>
                    <div className="text-muted-foreground text-sm">
                      {cat.products_count} products
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      Rs {Number(cat.revenue || 0).toFixed(2)}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {cat.total_sold || 0} units sold
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Products by Stock Value */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          {topSellingProducts.length > 0 ? (
            <DataTable columns={valueColumns} data={topSellingProducts} searchKey="title" />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No product data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockAlerts.length > 0 && (
        <Card className="border-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Products that need restocking soon</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={lowStockColumns} data={lowStockAlerts} searchKey="title" />
          </CardContent>
        </Card>
      )}

      {/* Out of Stock */}
      {outOfStockList.length > 0 && (
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
              {outOfStockList.map((product: any) => (
                <div
                  key={product.product_id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <div className="font-medium">{product.title}</div>
                    <div className="text-muted-foreground text-sm">{product.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rs {Number(product.price || 0).toFixed(2)}</div>
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
