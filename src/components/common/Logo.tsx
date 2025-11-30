'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <span className="text-lg font-bold text-primary-foreground">H</span>
      </div>
      <span className="text-lg font-semibold">Hamfa Admin</span>
    </Link>
  );
};

export default Logo;

