import BannersView from '@/app-pages/banners-view/BannersView';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <BannersView id={pageParams?.id} />;
};

export default Page;

