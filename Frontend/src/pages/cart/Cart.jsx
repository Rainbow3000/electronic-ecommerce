import {React,useEffect} from 'react'
import './cart.scss'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {setCart,updateCart,deleteCart} from '../../store/slice/cartSlice'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const Cart = () => {
  const {products,total} = useSelector(state => state.cart); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  console.log(navigate.parameter)
  useEffect(()=>{
     const data = JSON.parse(localStorage.getItem('cart'));
     if(data !== null){
         dispatch(setCart(data))
     }
  },[dispatch])

  let filterProducts = [...products]; 
  const handleClick = (type,indexs,productId)=>{
      if(type === "decrement"){
            let product = filterProducts.find((item,index)=>index === indexs);
            filterProducts = [...filterProducts.slice(0,indexs),{...product,quantity: product.quantity > 1 ? product.quantity - 1 : 1 },...filterProducts.slice(indexs + 1)]; 
        }else{
          let product = filterProducts.find((item,index) => index === indexs);
          filterProducts = [...filterProducts.slice(0, indexs), { ...product, quantity: product.quantity + 1 }, ...filterProducts.slice(indexs + 1)]; 
      }
      dispatch(updateCart(filterProducts))
  }

  const handleRemoveCart = (indexs)=>{
        const filterProductsRemove = filterProducts.filter((item,index)=>index !== indexs);  
        dispatch(deleteCart(filterProductsRemove)); 
  }
  const handleCartNextStep = ()=>{
        const user = JSON.parse(localStorage.getItem('user')); 
        if(!user){
            navigate({
                pathname:'/login', 
                search: '?from=Cart',
            });
        }else{
            navigate('/address'); 
        }
  }
  return (
    <div className='cart-container'>
        {
            products.length ? (

            <div className='cart-wraper'>
                <h1>GIỎ HÀNG</h1>
                <div className='cart-main'>
                    <div className='cart-main-left'>
                        {
                            products.length ?
                                products.map((item,index)=>{
                            return <div key={index} className='cart-item'>
                                <img src={item.image} alt="" />
                                <div className='cart-item-info'>
                                    <span>{item.name}</span>
                                    <span>{item.desc}</span>
                                    <span><span style={{ "color": "blue" }}>{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></span>
                                </div>
                                <div className='cart-item-quantity'>
                                    <div onClick={()=>handleClick("decrement",index,item._id)}>-</div>
                                    <div>{item.quantity}</div>
                                    <div onClick={()=>handleClick("increment",index,item._id)}>+</div>
                                </div>
                                <div onClick={()=>handleRemoveCart(index)} className='cart-clear-icon'>
                                    <DeleteOutlineIcon style={{color:'red'}}/>
                                </div>
                            </div>
                            }):<h2>Chưa có sản phẩm !</h2>
                            
                        }
                                            
                    </div>
                    <div className='cart-main-right'>
                        <h3>Thông tin giỏ hàng</h3>
                        <ul>
                            <li>Phí vận chuyển: <mark>0 VND</mark></li>
                            <li>Thuế : <mark>0 VND</mark></li>
                            <li>Tổng tiền: <mark style={{color:'blue',fontWeight:'bold'}}>{total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</mark></li>
                        </ul>
                        <button onClick={handleCartNextStep}>Tiếp tục</button>
                    </div>
                </div>
            </div>
            ):(
                <div style={{width:1300,margin:'0 auto',height:500,display:'flex',justifyContent:'center',alignItems:'center'}}><h2>GIỎ HÀNG CHƯA CÓ SẢN PHẨM</h2></div>
            )
        }
    </div>
  )
}

export default Cart