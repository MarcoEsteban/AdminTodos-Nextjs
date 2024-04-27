'use server';

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache'; // Permite mantener los nuevos cambios en cache, Next se encarga de nuestro cache.

// 'use server' :: Es para indicarle que es un server action. puede estar dentro de la funcion o indicar que este archivo es un server actions.
// Indico que todo es archivo va ser un 'Server Action', pero el cliente puede mandarlo a llamar.

const sleep = ( seconds: number = 0 ): Promise<boolean> => {
  return new Promise( ( resolve ) => {
    setTimeout( () => {
      resolve( true );
    }, seconds * 1000 );
  } );
};

/**
* @method ActualizarTodo
* ? Actualiza el todo, solo realizando el cambio en el complete. entre True | False
*/
export const toggleTodo = async ( id: string, complete: boolean ): Promise<Todo> => {
  await sleep(3)
  const todo = await prisma.todo.findFirst( { where: { id } } );

  if ( !todo ) {
    throw `Todo con id ${ id } no encontrado`;
  }

  const updateTodo = await prisma.todo.update( {
    where: { id },
    data: { complete }
  } );

  // Revalida solo la ruta donde nos encontramos, para que solo cargue lo que cambio.
  revalidatePath( '/dashboard/server-todos' );

  return updateTodo;
};

/**
* @method agregarTodo
* ? Crea el todo, solo agregando la description y manteniendo el complete por defecto en false.
*/
// export const addTodo = async ( description: string ): Promise<Todo> => {
export const addTodo = async ( description: string ) => {
  try {
    const todo = await prisma.todo.create( { data: { description, userId: '...' } } );
    // Revalida solo la ruta donde nos encontramos, para que solo cargue lo que cambio.
    revalidatePath( '/dashboard/server-todos' );
    return todo;

  } catch ( error ) {
    return {
      message: 'Error creando todo'
    };
  }
};


/**
* @method eliminarTodo
* ? Elimina los todos, donde su complete === True 
*/
export const deleteCompleted = async (): Promise<void> => {

  await prisma.todo.deleteMany( { where: { complete: true } } );
  // Revalida solo la ruta donde nos encontramos, para que solo cargue lo que cambio.
  revalidatePath( '/dashboard/server-todos' );

};
