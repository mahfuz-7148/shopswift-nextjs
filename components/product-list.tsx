import Stripe from "stripe";
import {ProductCard} from "@/components/product-card";

interface Props {
    products: Stripe.Product[]
}
export const ProductList = ({products}: Props) => {
    return (
        <div>
            <div>
                <input type="text" placeholder='Search Products'/>
            </div>
            <ul>
                {products.map((product, key) => {
                    return (
                        <li key={key}>
                            <ProductCard product={product} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
