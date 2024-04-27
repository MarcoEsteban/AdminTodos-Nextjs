'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import { CiLogout } from 'react-icons/ci';
import { IoShieldOutline } from 'react-icons/io5';
import { PiSignInThin } from 'react-icons/pi';

export const LogoutButton = () => {

  // Usamos Hook para Obtener la Informacion de Usuario desde un 'Client Side'
  const { data: session, status } = useSession();

  if ( status === 'loading' ) {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    );
  }

  if ( status === 'unauthenticated' ) {
    return (
      <button
        onClick={ () => signIn() }
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <PiSignInThin />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    );
  }


  return (
    <button
      onClick={ () => signOut() }
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};