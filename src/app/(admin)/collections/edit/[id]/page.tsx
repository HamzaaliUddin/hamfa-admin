import CollectionsEdit from '@/app-pages/collections-add-edit/CollectionsEdit';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <CollectionsEdit id={pageParams?.id} />;
};

export default Page;

