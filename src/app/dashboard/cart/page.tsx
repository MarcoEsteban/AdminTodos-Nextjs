import { WidgetItem } from '@/components';
import { products, type Product } from '@/products/data/products';
import { ItemCard } from '@/shopping-cart';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Carrito de Compra',
  description: 'SEO Title'
};

interface Cart {
  [ id: string ]: number;
}

interface ProductsInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = ( cart: Cart ): ProductsInCart[] => {

  const productsInCart: ProductsInCart[] = [];

  // Object.keys(cart) :: Obtengo cada una de las llaves del objeto.
  for ( const id of Object.keys( cart ) ) {
    const product = products.find( prod => prod.id === id );
    if ( product ) {
      productsInCart.push( { product: product, quantity: cart[ id ] } );
    }
  }

  return productsInCart;

};

export default function CartPage() {

  const cookiesStore = cookies();
  const cart = JSON.parse( cookiesStore.get( 'cart' )?.value ?? '{}' ) as Cart;
  const productsInCart = getProductsInCart( cart );

  // Utilizando un 'Reduce' en vez de un 'For' para Calcular el total a Pagar:
  const totalToPay = productsInCart.reduce( ( prev, current ) => ( current.product.price * current.quantity ) + prev, 0 );

  return (
    <div>
      <h1 className="text-5xl">Producto en el Carrito</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">

        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.map( product => (
              <ItemCard key={ product.product.id } { ...product } />
            ) )
          }
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a Pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">${ (totalToPay * 1.15).toFixed(2) }</h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuesto 15%: $ { (totalToPay * 0.15).toFixed(2) }
            </span>
          </WidgetItem>
        </div>

      </div>
    </div>
  );
}