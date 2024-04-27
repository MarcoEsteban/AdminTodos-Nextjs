import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET( request: Request ) {

  await prisma.todo.deleteMany(); // DELETE * FROM todo
  await prisma.user.deleteMany(); // DELETE * FROM user

  const user = await prisma.user.create( {
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync( '123456' ),
      roles: [ 'admin', 'client', 'super-user' ],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' },
        ]
      }
    }
  } );

  // Realizamos un Insert a la BD: de uno en uno
  // const todo = await prisma.todo.create({
  //   data: { description: 'Piedra del alma', complete: true }
  // })

  // Realizamos un Insert a la BD: de forma masiva como si estaria utilizando transacciones.
  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma', complete: true },
  //     { description: 'Piedra del poder' },
  //     { description: 'Piedra del tiempo' },
  //     { description: 'Piedra del espacio' },
  //     { description: 'Piedra del realidad' },
  //   ]
  // })


  return NextResponse.json( {
    message: 'Seed Executed'
  } );
}