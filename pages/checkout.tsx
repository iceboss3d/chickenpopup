import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { ShoppingCartContext } from '../helpers/UseContext'

export default function checkout() {
    const {shoppingCart} = useContext(ShoppingCartContext);

    console.log(shoppingCart);
    
    return (
        <Layout>
            <div>
                <h3 className="display-3">Checkout</h3>
            </div>
        </Layout>
    )
}
