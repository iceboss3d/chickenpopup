import Head from 'next/head'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import { ShoppingCartContext } from '../helpers/UseContext'
import { IShoppingCart } from './interface'

export default function Layout({ children }: { children: ReactNode }) {

    const [shoppingCart, setShoppingCart] = useState([])
console.log(shoppingCart);

    return (
        <div>
            <Head>
                <title>Chicken Pop-Up Yenagoa</title>
                <meta name="description" content="Buy live chicken as low as ₦3,700 in Yenagoa. Free next day delivery" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>
            </Head>
            <div className="container mt-5">
                <h1 className="display-4 text-center">Chicken Pop-Up, Yenagoa</h1>
                <p className="lead text-center">Buy live chicken as low as ₦3,700 in Yenagoa. Free next day delivery</p>
                <div className="row">
                    <div className="col-md-6">
                        <Image src="/chicken.jpg" alt="Chicken Pop-Up, Yenagoa" width={450} height={388} />
                    </div>
                    <div className="col-md-6">
                        <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
                            {children}
                        </ShoppingCartContext.Provider></div>
                </div>
            </div>
        </div>
    )
}
