import React, { useState,useEffect } from 'react'
import { Box } from '@mui/system'
import Button from '@mui/material/Button';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts,deleteProduct } from '../../redux/slices/productSlice'
import EventNoteIcon from '@mui/icons-material/EventNote';
import './product.css'
const Product = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product); 
    const navigate = useNavigate(); 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); 
        if(user === null || user === undefined){
            navigate('/login')
        }
        dispatch(fetchProducts());

    }, [])

const handleDelete = (productId)=>{
    let text = "Bạn có chắc muốn xóa sản phẩm này không ?"
    if (window.confirm(text) === true) {
         dispatch(deleteProduct(productId)); 
         alert('Xóa sản phẩm thành công !'); 
         dispatch(fetchProducts());
    } else {
        text = "Đã hủy!";
    }
}
  return (
     <Box sx={{width:"100%",marginTop:10}}>
            <button  style={{position:'fixed',right:10,height:40, outline:'none',padding:10,borderRadius:5, border:'none', top:70,backgroundColor:'green',color:'white',fontWeight:'bold'}}>
                <Link to="/product/create">TẠO SẢN PHẨM</Link>
            </button>

<table id="customers">
  <tr>
    <th>Ảnh</th>
    <th>Tên</th>
    <th>Mô tả</th>
    <th>Giá</th>
    <th>Thao tác</th>
  </tr>
    {
         products.map(item=>{
            return (
                <tr>
                    <td><img src={item.image} alt="" /></td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                    <td>

                    <Link to={`/product/product-update/${item._id}`}>
                        <EventNoteIcon color='yellow'  sx={{marginRight:3,cursor:'pointer', marginTop:1}}/>
                    </Link>
                    <DeleteOutlineOutlinedIcon  sx={{cursor:'pointer'}} onClick = {()=>handleDelete(item._id)} color='error'/>
                    </td>
                </tr>
            )
         })
    }
</table>

     </Box>
  )
}

export default Product