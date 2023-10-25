import {React,useEffect, useState} from 'react'
import './singleProduct.scss'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSingleProduct} from '../../store/slice/productSlice'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {addToCart} from '../../store/slice/cartSlice'; 
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import {createComment,getAllComment} from "../../store/slice/commentSlice"
const SingleProduct = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const productId = location.pathname.split('/')[2]; 
  const {isFetching} = useSelector(state=>state.product); 
  const [listProducts,setListProducts] = useState([]); 
  const singleProducts = listProducts.find(item=>item._id === productId); 
  const {comments}  = useSelector(state=>state.comment); 
  const {user} = useSelector(state=>state.user); 
  const dispatch = useDispatch();
  const [quantityCart,setQuantityCart] = useState(1); 
  const [comment,setComment] = useState(""); 
  const [size,setSize] = useState(singleProducts && singleProducts.size && singleProducts.size[0]);
  const [color,setColor] = useState(singleProducts && singleProducts.color && singleProducts.color[0]); 
  const [indexSize,setIndexSize] = useState(0); 
  

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem('products')); 
    setListProducts(products)
  },[])
  const handleQuantityClick = (type)=>{
      if(type==="decrement"){
        quantityCart > 1 && setQuantityCart(quantityCart => quantityCart - 1) 
      }else{
        setQuantityCart(quantityCart=>quantityCart + 1); 
      }
  }
  const handleSizeClick =(index,type)=>{
        setSize(type)
        setIndexSize(index);
  }

  const handleAddToCart = () => {
    const product = {
      _id:singleProducts._id,
      name: singleProducts.name,
      desc: singleProducts.desc,
      image:singleProducts.image,
      color : singleProducts.color,
      price: singleProducts.price,
      quantity:quantityCart
    }   
     dispatch(addToCart(product))
     navigate("/cart")
  }
  const handleComment = ()=>{
    if(!user){
      navigate('/login'); 
    }else{
       const data = {
          userId:user._id, 
          content:comment, 
          productId
       }
       dispatch(createComment(data)); 
       navigate(0);
    }
  }
  useEffect(()=>{     
      dispatch(getAllComment(productId)); 
      setColor(""); 
  },[])

  const handleChangeColor = (e)=>{
     setColor(e.target.value); 
  }

  return (
    <div className='single-product-container'>  
        {
        isFetching ? <div style={{textAlign:"center"}}>Đang tải...</div> : <div className="single-product-wraper">
           <img src={singleProducts && singleProducts.image && singleProducts.image} alt="" />
          <div className='single-product-info'>
             <h2 className='single-product-name'>{singleProducts && singleProducts.name}</h2> 
           
            <span className='single-product-description'>{singleProducts && singleProducts.desc}</span> 
           
            <span className='single-product-price'>Giá Tiền: <b style={{color:'blue'}}>{singleProducts && singleProducts.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b></span>
            <div className='single-product-color'>
              <label for="color">Màu Sắc: </label>
             
              <span style={{fontSize:20,marginLeft:10}}>{singleProducts && singleProducts.color}</span>

              {
                singleProducts && singleProducts.color && <div style={color?{backgroundColor: `${color}` }:{backgroundColor:`${singleProducts.color[0]}`}} className='sing-product-color-select'></div>
              }
           
            </div>
          
            <div className='single-product-quantity'>
              <div onClick={() => handleQuantityClick("decrement")}><RemoveIcon /></div>
              <div>{quantityCart}</div>
              <div onClick={() => handleQuantityClick("increment")}><AddIcon /></div>
            </div>
         
            <button onClick={handleAddToCart}><ShoppingCartIcon/>THÊM GIỎ HÀNG</button>
            
          </div>
        </div>
        } 
     
    </div>
  )
}

export default SingleProduct