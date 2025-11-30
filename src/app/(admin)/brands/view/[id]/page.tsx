import BrandsView from '@/app-pages/brands-view/BrandsView';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <BrandsView id={pageParams?.id} />;
};

export default Page;
