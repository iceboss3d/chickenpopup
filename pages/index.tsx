import { ChangeEvent, FormEvent, useState } from 'react'
import { FormData, ShoppingCart } from '../components/interface';
import Layout from '../components/Layout'
import products from "../components/products.json";
import { toNaira } from '../helpers/toNaira';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    product: "",
    units: 0
  })
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([])

  const productList = products.map((product, index) => (
    <option key={index} value={product.name}>{product.name} - {toNaira(product.amount)}</option>
  ))

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, item: string) => {
    setFormData((prev: FormData) => {
      return { ...prev, [item]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShoppingCart(prev => {
      const search = products.find(search => formData.product === search.name);
      const updatedData = {
          item: `${search.name} - ${toNaira(search.amount)}`,
          units: formData.units,
          pricePerUnit: search.amount
      }
      return [...prev, updatedData]
    });
  }

  return (
    <Layout>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size</label>
          <select required name="size" className="form-select form-select-lg" id="size" value={formData.product} onChange={(e) => {
            handleChange(e, "product")
          }}>
            <option value="" disabled>Select Size</option>
            {productList}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="units" className="form-label">No. of Units</label>
          <input required type="number" name="units" id="units" className="form-control form-control-lg" placeholder="Number of Units" value={formData.units} onChange={(e) => {
            handleChange(e, "units")
          }} />
        </div>
        <div className="d-grid gap-2 d-block">
          <button type="submit" className="btn btn-primary btn-block btn-lg">Add to Cart</button>
        </div>
      </form>
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Shopping Cart</h4>
          {shoppingCart.length < 1 ?
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
                {shoppingCart.map((cartItem, index) => (
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
                  <td><strong>{shoppingCart.reduce((total, cartItem) => (cartItem.pricePerUnit * cartItem.units) + total, 0).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</strong></td>
                </tr>
              </tfoot>
            </table>
          }
          <div className="d-grid gap-2 d-block">
            <button type="submit" className="btn btn-success btn-block btn-lg">Check Out</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
