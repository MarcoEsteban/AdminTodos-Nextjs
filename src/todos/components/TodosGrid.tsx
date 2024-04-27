'use client';

import { Todo } from '@prisma/client';
import { TodoItem } from './TodoItem';

// import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';
import { toggleTodo } from '../actions/todo-actions';

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ( { todos = [] }: Props ) => {

  // Permite hacer un refresh del componente no de una forma destructiva, es decir que solo actualiza el componente donde se realiza el cambio.
  const router = useRouter();

  // const toggleTodo = async ( id: string, complete: boolean ) => {
  //   const updateTodo = await todosApi.updateTodo( id, complete );
  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4">
      {
        todos.map( todo => (
          <TodoItem key={ todo.id } todo={ todo } toggleTodo={ toggleTodo } />
        ) )
      }
    </div>
  );
};