export const dynamic = 'force-dynamic'; // fuerz a una renderizacion dinamica. |'auto' = valueDefault | 'force-dynamic' | 'error' | 'force-static'
export const revalidate = 0; // Se encarga que siempre sea dinamicamente generada. | false = valueDefault | 0 | number

import { getUserSessionServer } from '@/auth/actions/auth-actions';

import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};

export default async function ServerTodosPage() {

  const user = await getUserSessionServer();
  if (!user) redirect('/api/auth/signin')

  // Server Actions:
  const todos = await prisma.todo.findMany( {
    where: { userId: user.id }, //Indico que muestro los Todos solo del usuario que inicio session.
    orderBy: { description: 'asc' } //Indico que lo ordene de forma ascendente.
  } );

  return (
    <div>
      <span className="text-3xl mb-10 text-blue-500 font-semibold">Server Actions</span>
      <div className="w-full px-5 mx-5 mb-2 mt-3 ">
        <NewTodo />
      </div>

      <TodosGrid todos={ todos } />
    </div>
  );
}