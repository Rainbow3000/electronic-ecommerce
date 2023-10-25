
import React,{useEffect} from "react";
import Box from '@mui/material/Box'
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Product from "./pages/product/Product";
import CreateProduct from './pages/createProduct/CreateProduct'
import ProductUpdate from "./pages/productUpdate/ProductUpdate";
import OrderList from "./pages/orderList/OrderList";
import DetailsOrder from "./pages/detailsOrder/DetailsOrder";
import Login from "./pages/login/Login";
import Message from "./pages/message/Message";
import {useSelector} from 'react-redux'
import Category from './pages/Category/Category';
import CategoryCreate from "./pages/Category/CategoryCreate";
import CategoryUpdate from "./pages/Category/CategoryUpdate";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  const {user} = useSelector(state=>state.user); 
  return (
    <Box sx={{width:"100%"}} className="admin-container">
        <Box sx={{ display: "flex", justifyContent: 'space-between', width: '100%', flexDirection: 'column' }}>
        <BrowserRouter>
                    {
                      user && <Sidebar />
                    }
                    <Box sx={{ width: "85%", marginLeft: "15%" }}>
                      <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                        {user &&<Navbar />}
                      </Box>
                    <Routes>                
                        <Route path="/category" element={<Category/>}  />    
                        <Route path="/" element={  <Product />} />  
                        <Route path="/product/create" element={ <CreateProduct/>} /> 
                        <Route path="/product/product-update/:id" element={ <ProductUpdate />} />
                        <Route path="/order" element={ <OrderList />} /> 
                        <Route path="/order/details/:id" element={ <DetailsOrder/>} />
                        <Route path="/message" element={<Message/>}/>
                        <Route path="/login" element={<Login/>}  />    
                        <Route path="/category/create" element={<CategoryCreate/>}  />    
                        <Route path="/category/:id" element={<CategoryUpdate/>}  />    
                    </Routes>
                </Box>
        </BrowserRouter>
        </Box>
      </Box>
  );
}

export default App;
