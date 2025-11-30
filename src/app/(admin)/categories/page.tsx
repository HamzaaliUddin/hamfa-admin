import { CategoriesList, CategoryAdd } from '@/app-pages/categories';
import { CrudLayout } from '@/components/common/crud-layout';

export default function CategoriesPage() {
  return (
    <CrudLayout
      title="Categories"
      description="Manage product categories"
      actionButton={<CategoryAdd />}
    >
      <CategoriesList />
    </CrudLayout>
  );
}
