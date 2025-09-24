import Stripe from "stripe";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface Props {
    product: Stripe.Product
}
export const ProductCard = ({product}: Props) => {
    const price = product.default_price as Stripe.Price
    return (
       <Link href={`/products/${product.id}`} className='block h-full'>
           <Card className='group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0'>
               {product.images && product.images[0] && (
                   <div className='relative h-80 w-full'>
                       <Image
                           src={product.images[0]}
                           alt={product.name}
                           layout='fill'
                           objectFit='cover'
                           className='group-hover:opacity-90 rounded-t-lg transition-opacity duration-500 ease-in-out'
                       />
                   </div>
               )}
               <CardHeader>
                   <CardTitle className='text-xl font-bold text-gray-800'>
                       {product.name}
                   </CardTitle>
               </CardHeader>
               <CardContent className='p-4 flex-grow flex flex-col justify-between'>
                   {product.description && (
                       <p className='text-gray-600 text-sm mb-2'>{product.description}</p>
                   )}
                   {price && price.unit_amount && (
                       <p className='text-lg font-semibold text-gray-900'>${(price.unit_amount / 100).toFixed(2)}</p>
                   )}
                   <Button className='mt-4 bg-black text-white'>
                       View Details
                   </Button>
               </CardContent>
           </Card>
       </Link>
    )
}
