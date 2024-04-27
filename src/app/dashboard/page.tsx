import { WidgetItem } from '@/components';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {

  // Mostrando la Informacion del Usuario Logout:
  const session = await getServerSession( authOptions );

  if ( !session ) {
    redirect( '/api/auth/signin' );
  }


  return (
    <div>
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> */ }
      <div className="grid gap-6 md:grid-cols-2 ">
        <WidgetItem title="Usuario conectado S-Side">
          <span>{ session?.user?.name ?? 'No Name' }</span>
          <span>{ session?.user?.email ?? 'No Email' }</span>
          {
            JSON.stringify( session.user )
          }
        </WidgetItem>
      </div>
    </div>
  );
}