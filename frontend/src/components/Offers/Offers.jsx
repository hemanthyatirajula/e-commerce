import React from 'react'
import './Offers.css'
import Banner from '../Assets/Exclusive.png'

export const Offers = () => {
  return (
   <div className="offers">
    <div className="offer-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
       <button>Check Now</button>
    </div>
      <div className="offer-right">
           <img src={Banner} alt=''/>
      </div>
   </div>
  )
}
export default Offers