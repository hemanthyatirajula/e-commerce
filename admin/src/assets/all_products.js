



import kid1 from "./product1.jpg";
import kid2 from "./product2.jpg"
import kid3 from "./product3.jpg";
import kid4 from "./product4.jpg";
import kid5 from "./product5.jpg";
import kid6 from "./product6.jpg";
import kid7 from "./product7.jpg";
import kid8 from "./product8.jpg";
import kid9 from "./product9.jpg";
import kid10 from "./product10.jpg";
import kid11 from "./product11.jpg";
import kid12 from "./product12.jpg";

import men1 from "./product-13.png";
import men2 from "./product-14.png";
import men3 from "./product-15.png";
import men4 from "./product-16.png";
import men5 from "./product-17.png";
import men6 from "./product-18.png";
import men7 from "./product-19.png";
import men8 from "./product-20.png";
import men9 from "./product-21.png";
import men10 from "./product-22.png";
import men11 from "./product-23.jpg";
import men12 from "./product-24.jpg";

import female1 from "./product25.jpg";
import female2 from "./product26.jpg";
import female3 from "./product27.jpg";
import female4 from "./product28.jpg";
import female5 from "./product29.jpg";
import female6 from "./product30.jpg";
import female7 from "./product31.jpg";
import female8 from "./product32.jpg";
import female9 from "./product33.jpg";
import female10 from "./product34.jpg";
import female11 from "./product35.jpg";
import female12 from "./product36.jpg";
const products = [
  // Kids Section (12 items)
  {
    id: 1,
    name: "Kids Floral Frock",
    category: "kids",
    image: kid1,
    new_price: 799,
    old_price: 999
  },
  {
    id: 2,
    name: "Boys Cotton Kurta",
    category: "kids",
    image: kid2,
    new_price: 649,
    old_price: 899
  },
  {
    id: 3,
    name: "Girls Party Gown",
    category: "kids",
    image: kid3,
    new_price: 1199,
    old_price: 1499
  },
  {
    id: 4,
    name: "Kids Denim Jacket",
    category: "kids",
    image: kid4,
    new_price: 999,
    old_price: 1299
  },
  {
    id: 5,
    name: "Infant Romper Set",
    category: "kids",
    image: kid5,
    new_price: 499,
    old_price: 699
  },
  {
    id: 6,
    name: "Boys Jeans & Tee",
    category: "kids",
    image: kid6,
    new_price: 799,
    old_price: 1099
  },
  {
    id: 7,
    name: "Girls Ethnic Wear",
    category: "kids",
    image: kid7,
    new_price: 899,
    old_price: 1199
  },
  {
    id: 8,
    name: "Kids Tracksuit",
    category: "kids",
    image: kid8,
    new_price: 699,
    old_price: 899
  },
  {
    id: 9,
    name: "Cartoon Pajama Set",
    category: "kids",
    image: kid9,
    new_price: 599,
    old_price: 799
  },
  {
    id: 10,
    name: "Girls Tutu Dress",
    category: "kids",
    image: kid10,
    new_price: 1099,
    old_price: 1399
  },
  {
    id: 11,
    name: "Boys Sportswear",
    category: "kids",
    image: kid11,
    new_price: 749,
    old_price: 999
  },
  {
    id: 12,
    name: "Girls Cotton Nighty",
    category: "kids",
    image: kid12,
    new_price: 699,
    old_price: 949
  },

  // Men Section (12 items)
  {
    id: 13,
    name: "Men's Casual Outfit 1",
    category: "mens",
    image: men1,
    new_price: 899,
    old_price: 1199
  },
  {
    id: 14,
    name: "Men's Casual Outfit 2",
    category: "mens",
    image: men2,
    new_price: 999,
    old_price: 1299
  },
  {
    id: 15,
    name: "Men's Casual Outfit 3",
    category: "mens",
    image: men3,
    new_price: 1099,
    old_price: 1399
  },
  {
    id: 16,
    name: "Men's Casual Outfit 4",
    category: "mens",
    image: men4,
    new_price: 1199,
    old_price: 1499
  },
  {
    id: 17,
    name: "Men's Casual Outfit 5",
    category: "mens",
    image: men5,
    new_price: 999,
    old_price: 1299
  },
  {
    id: 18,
    name: "Men's Casual Outfit 6",
    category: "mens",
    image: men6,
    new_price: 1099,
    old_price: 1399
  },
  {
    id: 19,
    name: "Men's Casual Outfit 7",
    category: "mens",
    image: men7,
    new_price: 1199,
    old_price: 1499
  },
  {
    id: 20,
    name: "Men's Casual Outfit 8",
    category: "mens",
    image: men8,
    new_price: 1299,
    old_price: 1599
  },
  {
    id: 21,
    name: "Men's Casual Outfit 9",
    category: "mens",
    image: men9,
    new_price: 1399,
    old_price: 1699
  },
  {
    id: 22,
    name: "Men's Casual Outfit 10",
    category: "mens",
    image: men10,
    new_price: 999,
    old_price: 1299
  },
  {
    id: 23,
    name: "Men's Casual Outfit 11",
    category: "mens",
    image: men11,
    new_price: 1099,
    old_price: 1399
  },
  {
    id: 24,
    name: "Men's Casual Outfit 12",
    category: "mens",
    image: men12,
    new_price: 1199,
    old_price: 1499
  },

  // Female Section (12 items)
  {
    id: 25,
    name: "Women's Stylish Dress 1",
    category: "womens",
    image: female1,
    new_price: 999,
    old_price: 1399
  },
  {
    id: 26,
    name: "Women's Stylish Dress 2",
    category: "womens",
    image: female2,
    new_price: 1099,
    old_price: 1499
  },
  {
    id: 27,
    name: "Women's Stylish Dress 3",
    category: "womens",
    image: female3,
    new_price: 1199,
    old_price: 1599
  },
  {
    id: 28,
    name: "Women's Stylish Dress 4",
    category: "womens",
    image: female4,
    new_price: 1299,
    old_price: 1699
  },
  {
    id: 29,
    name: "Women's Stylish Dress 5",
    category: "womens",
    image: female5,
    new_price: 1399,
    old_price: 1799
  },
  {
    id: 30,
    name: "Women's Stylish Dress 6",
    category: "womens",
    image: female6,
    new_price: 1499,
    old_price: 1899
  },
  {
    id: 31,
    name: "Women's Stylish Dress 7",
    category: "womens",
    image: female7,
    new_price: 1099,
    old_price: 1399
  },
  {
    id: 32,
    name: "Women's Stylish Dress 8",
    category: "womens",
    image: female8,
    new_price: 1199,
    old_price: 1599
  },
  {
    id: 33,
    name: "Women's Stylish Dress 9",
    category: "womens",
    image: female9,
    new_price: 999,
    old_price: 1299
  },
  {
    id: 34,
    name: "Women's Stylish Dress 10",
    category: "womens",
    image: female10,
    new_price: 1299,
    old_price: 1599
  },
  {
    id: 35,
    name: "Women's Stylish Dress 11",
    category: "womens",
    image: female11,
    new_price: 1399,
    old_price: 1699
  },
  {
    id: 36,
    name: "Women's Stylish Dress 12",
    category: "womens",
    image: female12,
    new_price: 1499,
    old_price: 1799
  },

 


];

export default products;
