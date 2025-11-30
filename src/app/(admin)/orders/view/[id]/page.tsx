import OrdersView from '@/app-pages/orders-view/OrdersView';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const pageParams = await params;

  return <OrdersView id={pageParams?.id} />;
};

export default Page;

