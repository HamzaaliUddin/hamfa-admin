'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetTermsById } from '@/queries/terms/useGetTermsById.query';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, FileText, Loader2, Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-800',
};

export default function TermViewPage() {
  const params = useParams();
  const router = useRouter();
  const termId = params.id as string;

  const { data: term, isLoading, error } = useGetTermsById(termId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !term) {
    return (
      <div className="space-y-6">
        <PageHeader title="Terms & Conditions Details" description="View terms information" />
        <div className="py-10 text-center">
          <FileText className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Terms not found</h2>
          <p className="text-muted-foreground mb-6">
            The terms & conditions you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/terms')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Terms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/terms')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={term.title} description={`Slug: ${term.slug}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[term.status]}`}>
                  {term.status.toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Version</p>
                <p className="mt-1 font-semibold">{term.version}</p>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Effective Date</p>
                <p className="mt-1 font-semibold">
                  {term.effective_date ? format(new Date(term.effective_date), 'PP') : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/terms/edit/${term.term_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Terms
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Terms Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">Title</p>
            <p className="font-medium">{term.title}</p>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground text-sm">Slug</p>
            <p className="font-medium">{term.slug}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm">Version</p>
              <p className="font-medium">{term.version}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Status</p>
              <Badge className={`${statusColors[term.status]}`}>{term.status.toUpperCase()}</Badge>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground text-sm">Effective Date</p>
            <p className="font-medium">
              {term.effective_date ? format(new Date(term.effective_date), 'PPP') : 'Not set'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-sm">{term.content}</div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      {(term.created_at || term.updated_at) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {term.created_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At</span>
                <span className="font-medium">{format(new Date(term.created_at), 'PPP p')}</span>
              </div>
            )}
            {term.updated_at && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated At</span>
                  <span className="font-medium">{format(new Date(term.updated_at), 'PPP p')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

