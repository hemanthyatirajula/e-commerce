import React from 'react'; 
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Shop from './pages/Shop';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assets/mens_banner.jpg';
import women_banner from './components/Assets/womens_banner.jpg';
import kids_banner from './components/Assets/kids_banner.jpg';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category ='mens'/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category ='womens'/>}/>
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category ='kids'/>}/>
         <Route path='/product/:productID' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>

      </Routes>
      </BrowserRouter>

      

<Footer/>
    </div>
  );
}

export default App;

