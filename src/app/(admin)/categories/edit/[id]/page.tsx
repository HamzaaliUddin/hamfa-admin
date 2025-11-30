'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CrudLayout, CrudFormSection } from '@/components/common/crud-layout';
import { useGetCategoryById } from '@/queries/categories/useGetCategoryById.query';
import { useUpdateCategory } from '@/queries/categories/useUpdateCategory.query';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  
  const { data: category, isLoading } = useGetCategoryById(categoryId);
  const updateCategory = useUpdateCategory();
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: '',
    image: '',
    icon: '',
    status: 'active' as 'active' | 'inactive',
    sort_order: 0,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        parent_id: category.parent_id?.toString() || '',
        image: category.image || '',
        icon: category.icon || '',
        status: category.status || 'active',
        sort_order: category.sort_order || 0,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await updateCategory.mutateAsync({
        id: parseInt(categoryId),
        data: {
          ...formData,
          parent_id: formData.parent_id ? parseInt(formData.parent_id) : undefined,
        },
      });
      router.push('/categories');
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-10">
        <p>Category not found</p>
        <Button onClick={() => router.push('/categories')} className="mt-4">
          Back to Categories
        </Button>
      </div>
    );
  }

  return (
    <CrudLayout 
      title="Edit Category" 
      description={`Update ${category.name}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <CrudFormSection title="Category Information">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Enter category name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    name="slug" 
                    placeholder="category-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    URL-friendly version. Auto-generated if left blank.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Category description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon (Emoji or Unicode)</Label>
                  <Input 
                    id="icon" 
                    name="icon" 
                    placeholder="🏷️"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  />
                </div>
              </div>
            </CrudFormSection>

            <CrudFormSection title="Category Image">
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  name="image" 
                  type="url" 
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              {formData.image && (
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div className="mt-2 relative h-48 w-full rounded-lg border overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Category preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </CrudFormSection>
          </div>

          <div className="space-y-6">
            <CrudFormSection title="Category Settings">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: 'active' | 'inactive') => 
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="parent_id">Parent Category</Label>
                  <Input
                    id="parent_id"
                    name="parent_id"
                    type="number"
                    placeholder="Parent category ID (optional)"
                    value={formData.parent_id}
                    onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for root category
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    name="sort_order"
                    type="number"
                    min="0"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower numbers appear first
                  </p>
                </div>
              </div>
            </CrudFormSection>

            <CrudFormSection title="Actions">
              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={updateCategory.isPending}
                >
                  {updateCategory.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Category'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/categories')}
                >
                  Cancel
                </Button>
              </div>
            </CrudFormSection>
          </div>
        </div>
      </form>
    </CrudLayout>
  );
}

