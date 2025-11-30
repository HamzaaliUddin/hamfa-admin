'use client';

import { ReactNode } from 'react';
import QueryProvider from './QueryProvider';

type Props = {
  children: ReactNode;
};

const ProvidersHub = ({ children }: Props) => {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
};

export default ProvidersHub;

