'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';


export const getUserSessionServer = async () => {
  const session = await getServerSession( authOptions );
  return session?.user
};


/**
 * @mySignInEmailPassword : Lógica para la Autenticación del Usuario. 
 */
export const signInEmailPassword = async ( email: string, password: string ) => {

  if ( !email || !password ) return null;

  const user = await prisma.user.findUnique( { where: { email } } ); //? Buscamos si existe el user con el correo indicado.

  if ( !user ) { //? Si no existe el usuario lo creamos.
    const dbUser = await createUser( email, password );
    return dbUser;
  }

  if ( !bcrypt.compareSync( password, user.password ?? '' ) ) {
    return null;
  }
  return user;
};

const createUser = async ( email: string, password: string ) => {

  //? Creamos el Usuario
  const user = await prisma.user.create( {
    data: {
      email: email,
      password: bcrypt.hashSync( password ),
      name: email.split( '@' )[ 0 ]
    }
  } );

  return user;

};