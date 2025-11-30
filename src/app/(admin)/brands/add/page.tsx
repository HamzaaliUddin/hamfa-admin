'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import { Upload, X, ArrowLeft } from 'lucide-react';

export default function AddBrandPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/brands');
    }, 1500);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/brands')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      <CrudLayout title="Add New Brand" description="Create a new brand">
        <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <CrudFormSection title="Brand Information">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Brand Name *</Label>
                  <Input id="name" name="name" placeholder="Enter brand name" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" placeholder="brand-slug" />
                  <p className="text-xs text-muted-foreground">
                    URL-friendly version. Auto-generated if left blank.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter brand description"
                    rows={5}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </CrudFormSection>
          </div>

          <div className="space-y-6">
            <CrudFormSection title="Brand Logo">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="logo">Upload Logo</Label>
                  <div className="relative">
                    {logoPreview ? (
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="h-full w-full object-contain p-4"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={() => setLogoPreview(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="logo"
                        className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed hover:bg-accent"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload logo
                        </span>
                      </label>
                    )}
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square image, min 200x200px
                  </p>
                </div>
              </div>
            </CrudFormSection>

            <CrudFormSection title="Settings">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="featured">Featured Brand</Label>
                  <Select name="featured" defaultValue="no">
                    <SelectTrigger id="featured">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Show on homepage
                  </p>
                </div>
              </div>
            </CrudFormSection>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Brand'}
          </Button>
        </div>
      </form>
    </CrudLayout>
    </div>
  );
}
