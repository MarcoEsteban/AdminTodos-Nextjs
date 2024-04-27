// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

//? Especificamos como queremos que lusca el Usuario que Obtener de next-auth

/**
 * @myIUser
 *? Indicamos que vamos a extender o agregar una nueva propiedad de la 'session' que nos devuelve por defecto. Por Ejm: Vamos a tener acceso a:
 ** session.user = {
  name: '',
  email: '',
  ...etc,
  roles: [''],
 }   => Propiedad Por default
 ** session.roles  => Propiedad Agregada
 */ 
interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}