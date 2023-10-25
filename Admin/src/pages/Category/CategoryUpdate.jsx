import React, { useEffect, useState } from 'react'
import  {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import './category.css'
const CategoryUpdate = () => {

    const [name,setName] = useState(""); 
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const id = location.pathname.split('/')[2]; 
    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        await axios.put(`http://localhost:5000/api/category/${id}`,{name}); 
        alert('Sửa danh mục thành công')
        navigate('/category')
    }

    const getSingleCate = async()=>{
      try {
        const response = await axios.get(`http://localhost:5000/api/category/${id}`)
        setName(response.data.name)
      } catch (error) {
        
      }
    }

    useEffect(()=>{
      getSingleCate(); 
    },[])

  return (
    <>
        <form id='cate-form' style={{width:500,margin:'0 auto',marginTop:200}} onSubmit={handleSubmit} >
            <label for="fname">Tên danh mục</label>
            <input value={name} className='cate-create-input' type="text" id="fname" name="firstname" onChange={(e)=>setName(e.target.value)} placeholder="Tên danh mục"/>     
            <input className='cate-create-input-submit' type="submit" value="CẬP NHẬT DANH MỤC"/>
        </form>
    </>
  )
}

export default CategoryUpdate