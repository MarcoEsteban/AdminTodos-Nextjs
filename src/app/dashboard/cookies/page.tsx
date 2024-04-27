import { TabBar } from '@/components';
import { cookies } from 'next/headers';


export const metadata = {
  title: 'SEO Cookies Page',
  description: 'SEO Title',
};

export default function CookiesPage() {

  // ! Obteniendo o Genereando los Objetos de las Cookies:
  const cookieStore = cookies();
  const cookieTab = cookieStore.get( 'selectedTab' )?.value ?? '1'; // Puede que este establecida y puede que no.


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={ +cookieTab } />
      </div>

    </div>
  );
}