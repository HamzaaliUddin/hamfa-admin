import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Table } from '@/components/Table';
import { TableCell, TableRow } from '@/components/ui/table';
import { IOrderItem } from '@/types/api.types';
import PriceText from '@/components/common/PriceText';

type Props = {
  isLoading: boolean;
  products: IOrderItem[];
};

const OrdersViewProducts = ({ isLoading, products = [] }: Props) => {
  return (
    <Table
      headers={[]}
      noData={isEmpty(products)}
      isLoading={isLoading}
    >
      {products.map((row: IOrderItem) => {
        const price = parseFloat(row?.price || '0');
        const total = price * row?.quantity;
        
        return (
          <TableRow key={row?.product_id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {row?.image_url && (
                    <Image
                      src={row?.image_url}
                      fill
                      alt={row?.name?.en || 'Product'}
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{row?.name?.en}</p>
                  <p className="text-sm text-muted-foreground">{row?.name?.ar}</p>
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

