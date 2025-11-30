import { CollectionAdd, CollectionsList } from '@/app-pages/collections';
import { CrudLayout } from '@/components/common/crud-layout';

export default function CollectionsPage() {
  return (
    <CrudLayout
      title="Collections"
      description="Manage product collections"
      actionButton={<CollectionAdd />}
    >
      <CollectionsList />
    </CrudLayout>
  );
}
