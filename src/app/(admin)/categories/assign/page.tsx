'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Package, Check, X } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';

type CategoryAssignment = {
  productId: string;
  productName: string;
  currentCategory?: string;
  currentCategoryId?: string;
};

export default function AssignCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [assignments, setAssignments] = useState<CategoryAssignment[]>(
    products.map(p => ({
      productId: p.id,
      productName: p.title,
      currentCategory: p.category,
      currentCategoryId: p.categoryId,
    }))
  );

  const filteredProducts = assignments.filter(a =>
    a.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = (productId: string) => {
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }

    const category = categories.find(c => c.id === selectedCategory);
    if (!category) return;

    setAssignments(prev =>
      prev.map(a =>
        a.productId === productId
          ? { ...a, currentCategory: category.name, currentCategoryId: category.id }
          : a
      )
    );
  };

  const handleRemove = (productId: string) => {
    setAssignments(prev =>
      prev.map(a =>
        a.productId === productId
          ? { ...a, currentCategory: undefined, currentCategoryId: undefined }
          : a
      )
    );
  };

  // Get category stats
  const categoryStats = categories.map(cat => ({
    ...cat,
    assignedProducts: assignments.filter(a => a.currentCategoryId === cat.id).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assign Categories</h1>
        <p className="text-muted-foreground">Assign categories to products</p>
      </div>

      {/* Category Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Categories</CardDescription>
            <CardTitle className="text-3xl">{categories.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-3xl">{products.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Assigned</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {assignments.filter(a => a.currentCategoryId).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unassigned</CardDescription>
            <CardTitle className="text-3xl text-amber-600">
              {assignments.filter(a => !a.currentCategoryId).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Category</CardTitle>
            <CardDescription>Choose a category to assign products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryStats.map(category => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer rounded-lg border p-4 transition ${
                  selectedCategory === category.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.assignedProducts} products assigned
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{category.slug}</Badge>
                    {selectedCategory === category.id && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Assign or remove categories from products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Products */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredProducts.map(assignment => (
                <div
                  key={assignment.productId}
                  className="rounded-lg border p-3 hover:bg-accent/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium text-sm">{assignment.productName}</p>
                      </div>
                      {assignment.currentCategory ? (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {assignment.currentCategory}
                        </Badge>
                      ) : (
                        <p className="text-xs text-amber-600 mt-1">No category assigned</p>
                      )}
                    </div>

                    <div className="flex gap-1">
                      {assignment.currentCategoryId ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemove(assignment.productId)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAssign(assignment.productId)}
                          disabled={!selectedCategory}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No products found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Category Assignment Summary</CardTitle>
          <CardDescription>Overview of products per category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categoryStats
              .filter(cat => cat.assignedProducts > 0)
              .map(category => (
                <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.slug}</p>
                  </div>
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {category.assignedProducts} products
                  </Badge>
                </div>
              ))}

            {categoryStats.every(cat => cat.assignedProducts === 0) && (
              <p className="text-center text-muted-foreground py-4">
                No products assigned yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
