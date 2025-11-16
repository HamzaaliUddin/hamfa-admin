'use client';

import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { CrudLayout } from '@/components/common/crud-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
};

type Collection = {
  id: string;
  name: string;
  productCount: number;
};

// Mock data
const mockCollections: Collection[] = [
  { id: '1', name: 'Featured Collection', productCount: 24 },
  { id: '2', name: 'New Arrivals', productCount: 16 },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Product 1', sku: 'SKU001', price: 99.99 },
  { id: '2', name: 'Product 2', sku: 'SKU002', price: 149.99 },
  { id: '3', name: 'Product 3', sku: 'SKU003', price: 199.99 },
];

export default function AssignProductsPage() {
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleAssign = () => {
    // TODO: API call to assign products to collection
    alert(`Assigned ${selectedProducts.length} products to collection`);
    setSelectedProducts([]);
  };

  return (
    <PermissionGuard module={Module.COLLECTIONS} permission={Permission.UPDATE}>
      <CrudLayout
        title="Assign Products to Collection"
        description="Add products to existing collections"
        backButton={{
          label: 'Back to Collections',
          href: '/collections',
        }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Collection Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Collection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCollections.map(collection => (
                <div
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection.id)}
                  className={`cursor-pointer rounded-lg border p-4 transition ${
                    selectedCollection === collection.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{collection.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {collection.productCount} products
                      </p>
                    </div>
                    {selectedCollection === collection.id && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={`cursor-pointer rounded-lg border p-3 transition ${
                      selectedProducts.includes(product.id)
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sku} - ${product.price}
                        </p>
                      </div>
                      {selectedProducts.includes(product.id) && (
                        <Badge variant="default">
                          <Plus className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedProducts.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected: {selectedProducts.length} products
                  </p>
                  <Button
                    onClick={handleAssign}
                    disabled={!selectedCollection}
                    className="w-full"
                  >
                    Assign to Collection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CrudLayout>
    </PermissionGuard>
  );
}

