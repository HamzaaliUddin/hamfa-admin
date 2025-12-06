import CategoriesView from '@/app-pages/categories-view/CategoriesView';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <CategoriesView id={pageParams?.id} />;
};

export default Page;

