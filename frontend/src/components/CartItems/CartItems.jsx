import React, {useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from '../Assets/remove_icon.jpg'


export const CartItems = () => {
   
const { handleBuyNow,getTotalCartAmount,all_products,cartItems,removeFromCart} =useContext(ShopContext)
  return (
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p className='p_quanity'>Quantity</p>
            <p>Remove</p>
            <p>Total</p>
        </div>
        <hr/>
{all_products.map((e) => {
  if (cartItems[e.id] > 0) {
    return (
      <div key={e.id}>
        <div className="cartitems-format">
          <img src={e.image} alt="" className='carticon-product-icon' />
          <p>{e.name}</p>
          <p>₹{e.new_price}</p>
          <button className="cartitems-quantity">{cartItems[e.id]}</button>
          <img  className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="Remove" />
          <p>₹{e.new_price * cartItems[e.id]}</p>
          
          
        </div>
        <hr />
      </div>
    );
  } else {
    return null;
  }
})}
<div className="cartitems-down">
        <div className="cartitems-total">
              <h1>Cart Totals</h1>
            <div>
                   <div className="cartitems-total-item">
                      <p>Subtotal</p>
                      <p>{getTotalCartAmount()}</p>
                   </div>
                  <hr/>
                 <div className="cartitems-total-item">
                   <p>Shipping Free</p>
                   <p>Free</p>
                 </div>
                  <hr/>
                 <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>{getTotalCartAmount()}</h3>
                 </div>
            </div>
        <button className='buynow-btn' onClick={()=>handleBuyNow() }>Buy Now</button>
        </div>
<div className="cartitems-promcode">
    <p>If you have a promo code, Enter it here</p>
    <div className="cartitems-promobox">
        <input type="text" placeholder="promo code"/>
        <button>Submit</button>
    </div>
</div>
</div>
    </div>
  )
}
export default CartItems