import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrums/Breadcrum';
 import { ShopContext } from '../components/Context/ShopContext';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../components/RelatedProducts/RelatedProducts';


export const Product = () => {
  const { productID } = useParams();

   const { all_products } = useContext(ShopContext);

  // const product = all_products.find((e) => e.id === Number(productID));
  const product = all_products.find((e) => Number(e.id) === Number(productID));
  console.log("📦 Product ID from URL:", productID);
  console.log("🧺 Products from context:", all_products);
   
    if (!product) {
    return <p>Loading product details...</p>; // or show spinner or 404
  }
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  );
};

export default Product;

