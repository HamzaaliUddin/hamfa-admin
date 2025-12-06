import CategoriesEdit from '@/app-pages/categories-add-edit/CategoriesEdit';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <CategoriesEdit id={pageParams?.id} />;
};

export default Page;
