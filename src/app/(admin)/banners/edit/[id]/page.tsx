'use client';

import * as React from 'react';
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
import { Upload, X } from 'lucide-react';

export default function EditBannerPage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simulate API call to fetch banner
    setTimeout(() => {
      setImagePreview('/api/placeholder/1920/600');
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/banners');
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <CrudLayout title="Loading..." description="Please wait">
        <div>Loading banner...</div>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout title="Edit Banner" description="Update banner details">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <CrudFormSection title="Banner Details">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Banner Title *</Label>
                  <Input id="title" name="title" placeholder="Enter banner title" defaultValue="Summer Sale" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input id="subtitle" name="subtitle" placeholder="Enter subtitle (optional)" defaultValue="Up to 50% Off" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter banner description"
                    rows={3}
                    defaultValue="Limited time offer on all summer collections"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="link">Link URL</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    placeholder="/collections/summer-sale"
                    defaultValue="/collections/summer-sale"
                  />
                  <p className="text-xs text-muted-foreground">
                    Where should users go when they click the banner?
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    name="buttonText"
                    placeholder="Shop Now"
                    defaultValue="Shop Now"
                  />
                </div>
              </div>
            </CrudFormSection>
          </div>

          <div className="space-y-6">
            <CrudFormSection title="Banner Image">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <img
                          src={imagePreview}
                          alt="Banner Preview"
                          className="h-full w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={() => setImagePreview(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image"
                        className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed hover:bg-accent"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload banner
                        </span>
                      </label>
                    )}
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 1920x600px (16:9 ratio)
                  </p>
                </div>
              </div>
            </CrudFormSection>

            <CrudFormSection title="Settings">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="position">Position *</Label>
                  <Select name="position" defaultValue="homepage-hero" required>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homepage-hero">Homepage Hero</SelectItem>
                      <SelectItem value="homepage-secondary">Homepage Secondary</SelectItem>
                      <SelectItem value="category-top">Category Top</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    placeholder="1"
                    min="1"
                    defaultValue="1"
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower numbers appear first
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="expiresAt">Expiry Date</Label>
                  <Input
                    id="expiresAt"
                    name="expiresAt"
                    type="date"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for no expiry
                  </p>
                </div>

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
              </div>
            </CrudFormSection>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Banner'}
          </Button>
        </div>
      </form>
    </CrudLayout>
  );
}

