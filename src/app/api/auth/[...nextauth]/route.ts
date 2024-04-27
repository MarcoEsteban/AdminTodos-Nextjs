import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import async from '../../../../../../02-my-dashboard/src/app/dashboard/pokemons/[name]/page';
import { signInEmailPassword } from '@/auth/actions/auth-actions';


export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter( prisma ) as Adapter,

  providers: [

    GoogleProvider( {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    } ),

    GithubProvider( {
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    } ),

    CredentialsProvider( {
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "usuario@google.com" },
        password: { label: "Contraseña", type: "password", placeholder: "******" }
      },
      async authorize( credentials, req ) {
        const user = await signInEmailPassword( credentials!.email, credentials!.password );

        if ( user ) {
          return user;
        }
        return null;
      }
    } )

  ],


  session: {
    strategy: 'jwt'
  },

  // Se ejecuta despues que nos autentificamos. Es similar a los middlware, si no cumple la condicion de la funcion no le deja que se autentifique.
  callbacks: {

    async signIn( { user, account, profile, email, credentials } ) {
      console.log( user );

      return true;
    },

    // 1ro se Ejecuta esto:
    async jwt( { token, user, account, profile } ) {

      // Comprovamos que si existe el correo en la DB:
      const dbUser = await prisma.user.findUnique( { where: { email: token.email ?? 'no-email' } } );

      // Si el usuario esta inactivo le cierra la session:
      if ( !dbUser?.isActive ) {
        throw Error( 'Usuario no está activo' );
      }

      // Agregamos nuevos campos al token como ser los {roles, id}:
      token.roles = dbUser?.roles ?? [ 'no-roles' ];
      token.id = dbUser?.id ?? 'no-uuid';

      return token; // Puede Almacenar la informacion que quisieramos como {roles, id, ...etc}
    },

    // 2do se Ejecuta esto:
    async session( { session, token, user } ) {

      if ( session && session.user ) {
        // Agregamos nuevos campos a la session como ser los {roles, id}:
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session; // Tenemos que devolver es la session modificada.
    }

  }

};

const handler = NextAuth( authOptions );

// Indico que voy a manejar las Peticiones GET y POST por el Handler
export { handler as GET, handler as POST };