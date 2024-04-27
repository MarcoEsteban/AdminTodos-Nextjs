'use client';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// https://tailwindcomponents.com/component/radio-buttons-1

const tabOptions = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ( { tabOptions = [ 1, 2, 3, 4, ], currentTab = 1 }: Props ) => {

  const [ selected, setSelected ] = useState( currentTab );
  const router = useRouter(); // Para Refrescar la pagina donde nos encontramos.

  const onTabSelected = ( tab: number ) => {
    setSelected( tab );
    // ! Cookies:
    setCookie( 'selectedTab', tab.toString() ); // Establesco una Cookies.
    router.refresh();
  };

  /**
   * ! ERRORS:
   * ! Al parecer si tu escribes el digito en duro grid-cols-7 y luego pones el dinamico grid-cols-${tabOptions.lenght} solo se visualizara correctamente 
   * ! si pones 7 elementos en el arreglo... es como que se quedara en cache, pero si se cambia el digito se vuelve a poner en una sola columna... 
   * ! la solucion es la que pone Sergio del pino mas arriba, hay que poner en duro el estilo y no pasandolo por tailwind
   * ? ${ 'grid-cols-'+(tabOptions.length) } :: Esto es estilo css con Tailwind 
   * ? style={ { gridTemplateColumns: `repeat(${ tabOptions.length }, minmax(0, 1fr))` } } :: Esto es estilo de css normal => Solucion para column dinamica.
   */

  /**
   * ! WARNING:
   * app-index.js:33 Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. 
   * If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
   * Para solucionar este 'warning solo basta con colocar un onChange en el input, con un funcion vacia, de la Siguiente manera:
   * onChange={ () => {} }
   */

  return (
    // <div className={ `
    //   grid w-full space-x-2 rounded-xl bg-gray-200 p-2 
    //   ${ 'grid-cols-'+(tabOptions.length) }
    // `}>
    <div style={ { gridTemplateColumns: `repeat(${ tabOptions.length }, minmax(0, 1fr))` } }
      className={ `grid w-full space-x-2 rounded-xl bg-gray-200 p-2` }
    >
      {
        tabOptions.map( tab => (
          <div key={ tab }>
            <input
              checked={ selected === tab }
              onChange={ () => { } }
              type="radio"
              id={ tab.toString() }
              className="peer hidden" />

            <label
              onClick={ () => onTabSelected( tab ) }
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              { tab }
            </label>
          </div>
        ) )
      }
    </div>
  );
};