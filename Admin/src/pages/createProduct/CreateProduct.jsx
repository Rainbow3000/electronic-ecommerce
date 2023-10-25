import React from "react";
import "./createProduct.scss";
import { Box, Input, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../../redux/slices/productSlice";
import { publicRequest, userRequest } from "../../requestMethod";
import { useState, useEffect } from "react";
import {ref,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import {useSelector,useDispatch} from 'react-redux'
import  storage from '../../firebase'; 
import axios from 'axios'
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const CreateProduct = () => {
  const theme = useTheme();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(null);
  const [priceOld,setPriceOld] = useState(""); 
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [dataUrlImage, setDataUrlImage] = useState("");
  const [category,setCategory] = useState([]); 
  const dispatch = useDispatch(); 
  const {isLoading} = useSelector(state => state.product)
    const getCategorys = async()=>{
        try {
            const response = await axios.get('http://localhost:5000/api/category');
            setCategory(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

  const navigate = useNavigate();

 
  const handleFileInputChange = (event) => {
    dispatch(setIsLoading(true)); 
    const file = event.target.files[0];
    const storageRef = ref(storage,file.name); 
                uploadBytes(storageRef,file).then((snapshot)=>{
                    getDownloadURL(ref(storage,file.name)).then(downloadUrl => {
                      console.log(downloadUrl);
                       setDataUrlImage(downloadUrl); 
                       dispatch(setIsLoading(false))
                    })
                })
  };
 

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      name,
      desc,
      color,
      priceOld: parseFloat(priceOld),
      price: parseFloat(price),
      categoryId,
      image: dataUrlImage,
    };
    
    const productCreateRequest = async () => {
      try {
        await userRequest.post("/product", data);
        setPreviewSource("");
        setDataUrlImage("");
      } catch (error) {
        console.log(error);
      }
    };
    productCreateRequest();
    alert("Tạo sản phẩm thành công !");
    navigate("/");
  };

  useEffect(()=>{
    getCategorys(); 
  },[])


  return (
    
    <form id='cate-form' style={{width:500,margin:'0 auto',marginTop:200}} onSubmit={handleSubmitForm} >
    <label for="fname">Tên sản phẩm</label>
    <input className='cate-create-input' type="text" id="fname" name="firstname" onChange={(e)=>setName(e.target.value)} placeholder="Tên danh mục"/>     
    <label for="fname">Mô tả</label>
    <input className='cate-create-input' type="text" id="fname" name="firstname" onChange={(e)=>setDesc(e.target.value)} placeholder="Mô tả"/> 
    <label for="fname">Màu</label>
    <select onChange={(e)=> setColor(e.target.value)} className="select-option-input-create" id="country" name="country">
      <option disabled selected value="">Chọn màu</option>
      {
        ["Trắng","Đen","Đỏ","Xám","Xanh","Hồng","Vàng"].map(item=>{
          return (
            <option value={item} >{item}</option>
          )
        })
      }
    </select> 
    <label for="fname">Giá mới</label>
    <input className='cate-create-input' type="number" id="fname" name="firstname" onChange={(e)=>setPrice(e.target.value)} placeholder="Giá mới"/>  
     <label htmlFor="">Giá cũ</label>   
    <input className='cate-create-input' type="number" id="fname" name="firstname" onChange={(e)=>setPriceOld(e.target.value)} placeholder="Giá cũ"/>  
    <label htmlFor="">Danh mục</label>
    <select onChange={(e)=> setCategoryId(e.target.value)} className="select-option-input-create" id="country" name="country">
      <option disabled selected value="">Chọn danh mục</option>
      {
        category && category.map(item=>{
          return (
            <option value={item._id} >{item.name}</option>
          )
        })
      }
    </select> 
    <label htmlFor="">Ảnh</label>  
    <input  onChange={handleFileInputChange} className='cate-create-input' type="file" id="fname" name="firstname"/>      
    <div>
      {
        isLoading ? (
          <span style={{marginTop:5}}>Đang tải ảnh...</span>
        ):(
          dataUrlImage && <img width={120} height={120} src={dataUrlImage} alt="" />      
        )
      }
    </div>
    <input  style={isLoading ? {cursor:'not-allowed',backgroundColor:' #b3ffb3'}:{}} className='cate-create-input-submit' type={isLoading ? 'button':'submit'} value="TẠO SẢN PHẨM"/>
</form>
  );
};

export default CreateProduct;
