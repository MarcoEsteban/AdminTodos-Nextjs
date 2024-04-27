'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  title: string;
  icon: React.ReactNode;
  path: string;
}

export const SidebarItem = ( { title, icon, path }: Props ) => {

  const pathName = usePathname();

  return (
    <Link
      href={ path }
      className={`
        relative px-4 py-3 flex items-center space-x-4 rounded-xl 
        hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white
        ${ path === pathName && 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'}
      `}
    >
      { icon }
      <span className="-mr-1 font-medium">{ title }</span>
    </Link>
  );
};;