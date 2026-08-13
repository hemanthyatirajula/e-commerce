import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../components/Context/ShopContext';
import Item from '../components/Item/Item'; 
import dropdown_icon from '../components/Assets/dropdown_icon.jpg';

export const ShopCategory = (props) => {
  const { filteredProducts } = useContext(ShopContext);

  return (
    <div className="shop-category">
      <img src={props.banner} className="banner-img" alt="Banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
          {filteredProducts
          .filter(
          (item) =>
          props.category.toLowerCase() === item.category.toLowerCase()
          )
         .map((item) => (
        <Item
         key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}
           />
  ))}
      </div>
    </div>
  );
};

export default ShopCategory;
