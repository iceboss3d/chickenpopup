import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { IFormData, IShoppingCart } from '../components/interface';
import Layout from '../components/Layout'
import products from "../components/products.json";
import Cart from '../components/ShoppingCart.component';
import { toNaira } from '../helpers/toNaira';
import { ShoppingCartContext } from '../helpers/UseContext';

export default function Home() {
  const [formData, setFormData] = useState<IFormData>({
    product: "",
    units: 0
  });

  const {shoppingCart, setShoppingCart} = useContext(ShoppingCartContext)

  const productList = products.map((product, index) => (
    <option key={index} value={product.name}>{product.name} - {toNaira(product.amount)}</option>
  ))

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, item: string) => {
    setFormData((prev: IFormData) => {
      return { ...prev, [item]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShoppingCart((prev: IShoppingCart[]) => {
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
      {Cart}
    </Layout>
  )
}
