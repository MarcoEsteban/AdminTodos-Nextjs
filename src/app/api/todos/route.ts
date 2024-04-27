import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

// Forma de Importar yup:
// import { object } from 'yup';
import * as yup from 'yup';

export async function GET( request: Request ) {

  // Desestructuramos y obtenemos el dato de la URL en este caso el { take }:
  const { searchParams } = new URL( request.url );

  /**
  * * ?? '10' :: Indico que su valor por defecto va a ser 10. En caso de que take sea == null.
  * * ?? '0'  :: Indico que su valor por defecto va a ser 0. En caso de que skip sea == null.
  * ! Formas de Convertir de String a Number:
  * ? +        :: +take || + skip
  * ? Number() :: Number(take) || Number(skip)
  */
  const take = +( searchParams.get( 'take' ) ?? '10' );
  const skip = Number( searchParams.get( 'skip' ) ?? '0' );

  // Compruebo que sea un número:
  if ( isNaN( take ) ) {
    return NextResponse.json( { message: 'Take tiene que ser un número' }, { status: 400 } );
  }
  if ( isNaN( skip ) ) {
    return NextResponse.json( { message: 'Skip tiene que ser un número' }, { status: 400 } );
  }

  const todos = await prisma.todo.findMany( { take, skip } );

  return NextResponse.json(
    todos
  );
}

/**
 * @mySchema Forma Personal de usar 'Yup' de Fernando Herrera: 
 */
const postSchema = yup.object( {
  description: yup.string().required(),
  complete: yup.boolean().optional().default( false ),
} );

export async function POST( request: Request ) {

  // Para obtener el userId para que se Agregre && Muestre los Todos correspondiente al Usuario que inicio session.
  const user = await getUserSessionServer();
  if ( !user ) {
    return NextResponse.json( 'No autorizado', { status: 401 } );
  }

  try {

    const { complete, description } = await postSchema.validate( await request.json() );
    const todo = await prisma.todo.create( { data: { complete, description, userId: user.id } } );

    return NextResponse.json( todo );

  } catch ( error ) {
    return NextResponse.json( error, { status: 400 } );
  }
}


export async function DELETE( req: Request ) {

  // Para obtener el userId para que se Agregre && Muestre los Todos correspondiente al Usuario que inicio session.
  const user = await getUserSessionServer();
  if ( !user ) {
    return NextResponse.json( 'No autorizado', { status: 401 } );
  }

  try {
    await prisma.todo.deleteMany( { where: { complete: true, userId: user.id } } );

    return NextResponse.json( 'Exito' );
  } catch ( error ) {
    return NextResponse.json( error, { status: 400 } );
  }
}