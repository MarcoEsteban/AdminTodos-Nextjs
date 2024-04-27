'use client';

import { startTransition, useOptimistic } from 'react';
import { Todo } from '@prisma/client';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: ( id: string, complete: boolean ) => Promise<Todo | void>;
}

export const TodoItem = ( { todo, toggleTodo }: Props ) => {

  const [ todoOptimistic, toggleTodoOptimistic ] = useOptimistic(
    todo,
    ( state, newCompleteValue: boolean ) => ( { ...state, complete: newCompleteValue } )
  );

  const onToggleTodo = async () => {
    try {
      // Warning: An optimistic state update occurred outside a TodoItem.tsx:24 transition or action. To fix, move the update to an action, or wrap with startTransition.
      // El 'startTransition' resuelve el error de 'Warning' de arriba.
      startTransition( () => toggleTodoOptimistic( !todoOptimistic.complete ) ); // Esto realiza el cambio visualmente

      await toggleTodo( todoOptimistic.id, !todoOptimistic.complete ); // Ahora Realizamos la Accion que llega al Backend.
    } catch ( error ) {
      startTransition( () => toggleTodoOptimistic( !todoOptimistic.complete ) ); // Esto realiza el cambio visualmente
    }
  };

  return (
    <div className={ todoOptimistic.complete ? styles.todoDone : styles.todoPending }>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div
          // onClick={ () => toggleTodo( todoOptimistic.id, !todoOptimistic.complete ) }
          onClick={ onToggleTodo }
          className={ `
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60 
            ${ todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100' }
        `}>
          {
            todoOptimistic.complete
              ? ( <IoCheckboxOutline size={ 30 } /> )
              : ( <IoSquareOutline size={ 30 } /> )
          }
        </div>
        <div className="text-center sm:text-left">
          { todoOptimistic.description }
        </div>
      </div>
    </div>
  );
};