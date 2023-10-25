import {React,useEffect,useState,useRef} from 'react'
import {Box,Paper} from '@mui/material'
import { useForm } from "react-hook-form";
import {userLogin} from '../../redux/slices/userSlice'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './login.scss'
const Login = () => {
  const {errorMessage,user}  = useSelector(state=>state.user)
  const dispatch = useDispatch(); 
  let navigate = useNavigate();  
  const { register, handleSubmit, formState: { errors },setValue } = useForm();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== undefined && user !== null) {
            navigate('/');
        }else {
          navigate('/login')
        }
    }, [])
  const onSubmit = (data)=>{
        dispatch(userLogin(data));   
        setValue("password",""); 
   }

   if(user){
     navigate('/'); 
   }

  return (
     <Box className='login-container'>
        <img src="https://images.acer.com/is/image/acer/conceptd-5-laptop-banner-l?$responsive$" className='img-container'/>
        <h2 style={{zIndex:999999,marginTop:150,color:'gray',marginBottom:50}}>TRANG QUẢN TRỊ</h2>
         
        <Paper className='login-container-main'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span style={{textAlign:'center',color:'red',marginTop:10}}>{errorMessage.login}</span>
                    <label>Email</label>
                    <span className='error-login'>{errors.email?.type==="required" && "Email không được để trống !"}</span>
                    <span className='error-login'>{errors.email?.type === "pattern" && "Email không hợp lệ"}</span>
                    <input name='email' type="email" placeholder='Email...' {...register("email",{
                        required: true,pattern: /^[A-Z0-9 ._%+-]+@[A-Z0-9 .-]+\.[A-Z]{2,}$/i
                    })}/>
                </div>
                 <div>
                    <label>Mật khẩu</label>
                    <span className='error-login'>{errors.password?.type === "required" && "Mật khẩu không được để trống !"}</span>
                    <span className='error-login'>{errors.password?.type === "minLength" && "Mật khẩu phải ít nhất 8 ký tự!"}</span>
                    <input onChange={e=>setValue("password",e.target.value)} name='password' type="password" placeholder='Mật khẩu ...' {...register("password",{
                        required:true,minLength:8
                    })}/>
                </div>
                <button>ĐĂNG NHẬP</button>
            </form>
        </Paper>
     </Box>
  )
}

export default Login