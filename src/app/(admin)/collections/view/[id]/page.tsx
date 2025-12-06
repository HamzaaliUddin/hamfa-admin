import CollectionsView from '@/app-pages/collections-view/CollectionsView';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <CollectionsView id={pageParams?.id} />;
};

export default Page;

