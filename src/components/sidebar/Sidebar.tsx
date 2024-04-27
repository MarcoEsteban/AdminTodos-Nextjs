import Image from 'next/image';
import Link from 'next/link';
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5';
import { CiLogout, } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LogoutButton } from './LogoutButton';

const menuItem = [
  {
    title: 'Dashboard',
    icon: <IoCalendarOutline size={ 30 } />,
    path: '/dashboard'
  },
  {
    title: 'Rest TODOS',
    icon: <IoCheckboxOutline size={ 30 } />,
    path: '/dashboard/rest-todos'
  },
  {
    title: 'Server Actions',
    icon: <IoListOutline size={ 30 } />,
    path: '/dashboard/server-todos'
  },
  {
    title: 'Cookies',
    icon: <IoCodeWorkingOutline size={ 30 } />,
    path: '/dashboard/cookies'
  },
  {
    title: 'Productos',
    icon: <IoBasketOutline size={ 30 } />,
    path: '/dashboard/products'
  },
  {
    title: 'Perfil',
    icon: <IoPersonOutline size={ 30 } />,
    path: '/dashboard/profile'
  },
];

export const Sidebar = async () => {

  const session = await getServerSession( authOptions );

  const avatarUrl = ( session?.user?.image )
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  const userName = session?.user?.name ?? 'No Name';
  const userRoles = session?.user?.roles ?? [ 'client' ];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */ }
          <Link href="/dashboard" title="home">
            {/* Next/Image */ }
            <Image
              src={ "https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" }
              className="w-32"
              alt="tailus logo"
              width={ 150 }
              height={ 150 }
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */ }
          <Image
            src={ avatarUrl }
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            alt="tailus perfil"
            width={ 150 }
            height={ 150 }
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            { userName }
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            { userRoles.join( ', ' ) } {/* Separamos el Array de Roles por coma(',') */} 
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItem.map( item => (
              <SidebarItem key={ item.path } { ...item } />
            ) )
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};