import React, { useContext } from 'react'
import { ShoppingCartContext } from '../helpers/UseContext'
import { IShoppingCart } from './interface'

export default function Cart() {
  const { ShoppingCart } = useContext(ShoppingCartContext)
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">Shopping Cart</h4>
        {ShoppingCart.length < 1 ?
          <p className="lead">Shopping Cart Empty</p>
          :
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Units</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ShoppingCart.map((cartItem: IShoppingCart, index: number) => (
                <tr key={index}>
                  <td>{cartItem.item}</td>
                  <td>{cartItem.units}</td>
                  <td>{(cartItem.pricePerUnit * cartItem.units).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Sub Total</strong></td>
                <td></td>
                <td><strong>{ShoppingCart.reduce((total: number, cartItem: IShoppingCart) => (cartItem.pricePerUnit * cartItem.units) + total, 0).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</strong></td>
              </tr>
            </tfoot>
          </table>
        }
        <div className="d-grid gap-2 d-block">
          <button type="submit" className="btn btn-success btn-block btn-lg">Check Out</button>
        </div>
      </div>
    </div>
  )
}
