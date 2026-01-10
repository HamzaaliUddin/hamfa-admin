'use client';

import { CrudLayout } from '@/components/common/crud-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import URLs, { makeURL } from '@/utils/URLs.util';
import { Edit, FileText, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageLoader from '@/components/common/PageLoader';
import { useGetTermsById } from '@/queries/terms/useGetTermsById.query';
import { format } from 'date-fns';

type Props = {
  id: string;
};

const TermsView = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetTermsById(id);
  const term = data as any;

  const handleEdit = () => {
    const url = makeURL(URLs.TermsEdit, { id });
    router.push(url);
  };

  if (isLoading) {
    return <PageLoader isOpen={isLoading} />;
  }

  if (!term) {
    return (
      <CrudLayout
        title="Term Not Found"
        description="The term you're looking for doesn't exist"
        backButton={{
          label: 'Back to Terms',
          href: URLs.Terms
        }}
      >
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Term not found</p>
          </CardContent>
        </Card>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout
          title={term?.title || 'Term Details'}
          description="View term and conditions information"
          backButton={{
            label: 'Back to Terms',
            href: URLs.Terms
          }}
          actionButton={
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Term
            </Button>
          }
        >
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Term details and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Title</p>
                    <p className="mt-1 text-sm font-medium">{term?.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Term ID</p>
                    <p className="mt-1 text-sm">#{term?.term_id}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <p className="mt-1 text-sm">{term?.type || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Version</p>
                    <p className="mt-1 text-sm">{term?.version || '-'}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div className="mt-1">
                      <Badge variant={term?.status === 'active' ? 'default' : 'secondary'}>
                        {term?.status?.charAt(0).toUpperCase() + term?.status?.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Effective Date</p>
                    <p className="mt-1 text-sm">
                      {term?.effective_date
                        ? format(new Date(term.effective_date), 'MMM dd, yyyy')
                        : '—'}
                    </p>
                  </div>
                </div>

                {term?.description && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                      <p className="mt-1 text-sm">{term?.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {term?.content && (
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>Full term and conditions content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: term?.content }} />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {term?.created_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created At</span>
                    <span className="font-medium">{format(new Date(term.created_at), 'PPP p')}</span>
                  </div>
                )}
                {term?.updated_at && (
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
          </div>
        </CrudLayout>
  );
};

export default TermsView;

