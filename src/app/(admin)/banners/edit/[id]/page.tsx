import BannersEdit from '@/app-pages/banners-add-edit/BannersEdit';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <BannersEdit id={pageParams?.id} />;
};

export default Page;
