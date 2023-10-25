import React, { useEffect, useState } from 'react'
import  {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './category.css'
const CategoryCreate = () => {

    const [name,setName] = useState(""); 
    const navigate = useNavigate(); 
    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        await axios.post('http://localhost:5000/api/category',{name}); 
        alert('Tạo danh mục thành công')
        navigate('/category')
    }

  return (
    <>
        <form id='cate-form' style={{width:500,margin:'0 auto',marginTop:200}} onSubmit={handleSubmit} >
            <label for="fname">Tên danh mục</label>
            <input className='cate-create-input' type="text" id="fname" name="firstname" onChange={(e)=>setName(e.target.value)} placeholder="Tên danh mục"/>     
            <input className='cate-create-input-submit' type="submit" value="TẠO DANH MỤC"/>
        </form>
    </>
  )
}

export default CategoryCreate