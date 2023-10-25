import {React,useEffect, useState} from 'react'
import './productList.scss'
import Product from '../product/Product'
import { fetchProducts } from '../../store/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { filterProduct } from '../../store/slice/productSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
const ProductList = () => {
  const dispatch = useDispatch();
  const [categorys,setCategorys] = useState([]); 
  const {listProducts} = useSelector(state => state.product); 
  const [indexSort,setIndexSort] = useState(0);
  const getCategorys = async()=>{
    try {
      const response = await axios.get('http://localhost:5000/api/category'); 
      setCategorys(response.data)
    } catch (error) {
      
    }
  }

  const handleFilterColor = (value)=>{
    dispatch(filterProduct({type:'color',value}))
}
const handleFilterPrice = (value,type) => {
    dispatch(filterProduct({type:'price',value}))
    setIndexSort(type); 
}


  useEffect(()=>{
    dispatch(fetchProducts()); 
    getCategorys(); 
  },[dispatch])
  return (
    <div  className='product-list-container' id='product'>
      {
      
      categorys && categorys.map((cate,index)=>{
        return (
        <div className='product-container'>
            <div className='container-top'>
              
              <h1><ElectricBoltIcon/> {cate.name}</h1>
                {
                  index === 0 && (
                  <div className='filter'>
                  <ul>
                    <li>SẮP XẾP :</li>
                    <li className={indexSort === 1 ? 'index-active-sort':""} onClick={()=>handleFilterPrice('Thấp nhất',1)} >Giá Cao Nhất</li>
                    <li className={indexSort === 2 ? 'index-active-sort':""} onClick={()=>handleFilterPrice('Cao nhất',2)}>Giá Thấp Nhất</li>
                  </ul>
                  <div>
                    <select onChange={(e)=> handleFilterColor(e.target.value)} name="" id="">
                      <option defaultValue='' value='' selected  >Màu sắc</option>
                      <option value="Trắng">TRẮNG</option>
                      <option value="Đen">ĐEN</option>
                      <option value="Xám">Xám</option>
                      <option value="Xanh">XANH</option>
                      <option value="Đỏ">ĐỎ</option>
                      <option value="Tím">TÍM</option>
                      <option value="Vàng">VÀNG</option>
                    </select>
                  </div>
              </div>
                  )
                }
            </div>

            <div className='container-body-prod'>
                {
                  listProducts.map(item=>{
                    if(item.categoryId === cate._id){
                      return (
                        <Link to={`/single/${item._id}`}>
                        <div className='prod-item'>
                        <img src={item.image}  alt=""/>
                            <span className='prod-name'>{item.name}</span>
                            <div className='prod-price'>
                              <span>{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                              <span>{item.priceOld.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                            </div>
                            {/* <span className='prod-add-cart'><ShoppingCartIcon/> CHI TIẾT</span> */}
                        </div>
                        </Link>

                      )
                    }
                  })
                }
            </div>
        </div>
        )
      })   
      }
    </div>
  )
}

export default ProductList