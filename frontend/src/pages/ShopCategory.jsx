import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../components/Context/ShopContext';
import Item from '../components/Item/Item'; 
import dropdown_icon from '../components/Assets/dropdown_icon.jpg';

export const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext); 

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
        {all_products.map((item, i) => {
          console.log("Matching?", props.category, item.category);
          if (props.category.toLowerCase() === item.category.toLowerCase()) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
