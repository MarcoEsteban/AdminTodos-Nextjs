// 'use client'
/**
 * cookie: cart
 * {
 *  'uuid-123-1': 4,
 *  'uuid-123-2': 1,
 *  'uuid-123-3': 2,
 * }
 */

import { getCookie, hasCookie, setCookie } from 'cookies-next'; // Client-Side

// Funcion para obtener todo el carrito de compra.
export const getCookieCart = (): { [ id: string ]: number; } => {

  /**
   *? getCookie('cart') as string :: Indico que me retorne como un String.
   *? ?? '{}'                     :: Indico que me devuelva un Objeto vacio y retorne como un String.
   */
  if ( hasCookie( 'cart' ) ) {
    const cookieCart = JSON.parse( getCookie( 'cart' ) as string ?? '{}' );
    return cookieCart;
  }

  return {};
};

// Funcion para Agregar el Producto al Carrito de Compra: (Todo el Codigo es Sincrono)
export const addProductToCart = ( id: string ) => {

  const cookieCart = getCookieCart();

  if ( cookieCart[ id ] ) {
    cookieCart[ id ] += 1;
  } else {
    cookieCart[ id ] = 1;
  }

  setCookie( 'cart', JSON.stringify( cookieCart ) );

};

export const removeProductFromCart = ( id: string ) => {

  const cookieCart = getCookieCart();
  delete cookieCart[ id ]; // Elimina la cookie con el id que le pasemos.

  setCookie( 'cart', JSON.stringify( cookieCart ) );

};

export const removeSingleItemFromCart = ( id: string ) => {

  const cookieCart = getCookieCart();

  if ( !cookieCart[ id ] ) return;

  if ( cookieCart[ id ] ) {
    cookieCart[ id ] -= 1;
  }

  if ( cookieCart[ id ] === 0 ) {
    delete cookieCart[ id ]; // Elimina la cookie con el id que le pasemos.
  }

  setCookie( 'cart', JSON.stringify( cookieCart ) );

};