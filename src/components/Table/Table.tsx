'use client';

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table as UITable, 
  TableBody, 
  TableHead, 
  TableHeader as UITableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import PageEmpty from '../common/PageEmpty';

export type TableHeaderProps = {
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
};

type Props = {
  headers: TableHeaderProps[];
  children: ReactNode;
  noData?: boolean;
  isLoading?: boolean;
  minWidth?: number;
  isDense?: boolean;
  /** Number of skeleton rows to show while loading. Defaults to 10 to match typical page limits. */
  skeletonRows?: number;
};

const Table = ({ 
  headers, 
  children, 
  noData = false, 
  isLoading = false,
  minWidth,
  isDense = false,
  skeletonRows = 10
}: Props) => {

  return (
    <div className="overflow-x-auto">
      <UITable style={{ minWidth: minWidth ? `${minWidth}px` : undefined }}>
        <UITableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                style={{ width: header.width }}
                className={`${
                  header.align === 'center' 
                    ? 'text-center' 
                    : header.align === 'right' 
                    ? 'text-right' 
                    : 'text-left'
                } ${isDense ? 'py-2' : ''}`}
              >
                {header.title}
              </TableHead>
            ))}
          </TableRow>
        </UITableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((_, colIndex) => (
                  <td key={colIndex} className={isDense ? 'py-2' : ''}>
                    <Skeleton className="h-8 w-full" />
                  </td>
                ))}
              </TableRow>
            ))
          ) : noData ? (
            <TableRow>
              <td colSpan={headers.length}>
                <PageEmpty />
              </td>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </UITable>
    </div>
  );
};

export const TableWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <Card className={className}>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default Table;

