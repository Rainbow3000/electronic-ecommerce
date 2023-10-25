import React from 'react'
import {useEffect} from 'react'
import './login.scss'
import {userLogin,loginStart,loginFalure} from '../../store/slice/userSlice'
import { useDispatch,useSelector} from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


//frontend validate : formmik, hookform
//backend: joi 



const Login = () => { 
  const {register,handleSubmit,formState:{errors}} = useForm(); 
  const dispatch = useDispatch(); 
  const {errorMessage} = useSelector(state => state.user); 
  const user = JSON.parse(localStorage.getItem('user'));
  const query = window.location.search; 
  const queryPath = query.split('=')[1]; 

  let navigate = useNavigate(); 
  if (user) {
    if(queryPath){
      navigate(`/${queryPath}`); 
    }else{
      navigate('/');
    }
  }
  const onSubmit = (data)=>{
    dispatch(loginStart());
    dispatch(userLogin(data))
    dispatch(loginFalure());
    if(errorMessage){
      return; 
    }
  
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
   if (user) {
    if(queryPath){
      navigate(`/${queryPath}`); 
    }else{
      navigate('/');
    }
  }
  },[])
  return (
    <div className='login-container'>
      <div className="login-wraper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>ĐĂNG NHẬP</h1>    
          <div>
            <span style={{textAlign:'center',color:'red'}}>{errorMessage && errorMessage.login}</span>
            <label htmlFor="">Email <span>*</span></label>
            <span className='error-login'>{errors.email?.type === "required" && "Email không được trống!"}</span>
            <span className='error-login'>{errors.email?.type === "pattern" && "Email không hợp lệ!"}</span>
            <input required name='email' type="email" placeholder='Email' {...register("email", { required: true, pattern: /^[A-Z0-9 ._%+-]+@[A-Z0-9 .-]+\.[A-Z]{2,}$/i })} />
          </div>
          <div>
            <label htmlFor="">Mật khẩu <span>*</span></label>
            <span className='error-login'>{errors.password?.type === "required" && "Mật khẩu không được trống!"}</span>
            <span className='error-login'>{errors.password?.type === "minLength" && "Mật khẩu phải ít nhất 8 kí tự"}</span>
            <input name='password' type="password" placeholder='Mật khẩu' {...register("password",{ required: true, minLength: 8})} />
          </div>
          <div>
            <Link to="/register">Bạn chưa có tài khoản ?</Link>
            <button>ĐĂNG NHẬP</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login