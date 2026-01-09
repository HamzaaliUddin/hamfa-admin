import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { OrderItem } from '@/queries/orders/useGetOrders.query';
import PriceText from '@/components/common/PriceText';

type Props = {
  isLoading: boolean;
  products: OrderItem[];
};

const OrdersViewProducts = ({ isLoading, products = [] }: Props) => {
  return (
    <Table
      headers={[]}
      noData={isEmpty(products)}
      isLoading={isLoading}
    >
      {products.map((row: OrderItem) => {
        const price = row?.price || 0;
        const total = row?.total || (price * row?.quantity);
        
        return (
          <TableRow key={row?.order_item_id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {row?.image && (
                    <Image
                      src={row.image}
                      fill
                      alt={row?.title || 'Product'}
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{row?.title}</p>
                  <p className="text-sm text-muted-foreground font-mono">{row?.sku}</p>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-center">
              <PriceText amount={price} />
              {` x `}
              {row?.quantity}
            </TableCell>

            <TableCell className="text-center">
              <PriceText amount={total} />
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default OrdersViewProducts;
