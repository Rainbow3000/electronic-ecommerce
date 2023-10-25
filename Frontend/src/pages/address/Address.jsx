import {React,useEffect} from 'react'
import './address.scss'
import {useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import moment from 'moment';
import { clearCart } from '../../store/slice/cartSlice';
import {createOrderUser,createOrderEnd} from '../../store/slice/orderSlice'
const Address = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const {register,handleSubmit, formState:{errors} }  = useForm(); 
  const {user} = useSelector(state=>state.user); 
  const {products,total} = useSelector(state=>state.cart);  
  const { isOrderSuccess } = useSelector(state=>state.order);
  const filterProducts = products.map(item => {
    return {productDesc: item.desc,productName: item.name,productId: item._id, quantity: item.quantity, total: item.quantity * item.price, size: item.size, color: item.color,image:item.image}
  })

  useEffect(()=>{
      if(!user){
        navigate('/login')
      }
  },[])
    const onSubmit  = (data)=>{
        const {address,phone,city,national}  = data; 
        const order = {
            userId: user._id,
            userName: user.userName,
            email:user.email,
            product: [...filterProducts],
            totalOrder: total,
            phone: phone,
            address: address,
            methodPay: "Nhận hàng trả tiền",
            isPaid: false,
            isDelivered: false,
            deliveredAt: "",
            paidAt:"",
            size:"no using",
            orderDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
            resultOrder: "pending"
        }
        dispatch(createOrderUser({order}));
    }

    if (isOrderSuccess) {
        dispatch(clearCart());
        dispatch(createOrderEnd());
        alert('Bạn đã đặt hàng thành công !');
        navigate('/');
      }
  return (
    <div className='address-container'>
        <div className="address-wraper">
            <div className='address-form'>
                 <span>ĐỊA CHỈ GIAO HÀNG</span>
                 <form onSubmit={handleSubmit(onSubmit)}>
                     <div>
                        
                          <span>{errors.address?.type === "required" && "Địa chỉ không được để trống!"}</span>
                          <span>{errors.address?.type === "minLength" && "Địa chỉ phải ít nhất 8 ký tự"}</span>
                          <input name='address' type="text" placeholder='Địa chỉ' {...register("address",{required:true,minLength:8})} />
                     </div>
                      <div>
                          {/* <label htmlFor="">Phone<span>*</span></label> */}
                          <span>{errors.phone?.type === "required" && "Điện thoại không được để trống!"}</span>
                          <span>{errors.phone?.type === "minLength" && "Điện thoại phải ít nhất 8 ký tự"}</span>
                          <input name='phone' type="number" placeholder='Điện thoại' {...register("phone",{required:true,minLength:10})} />
                      </div>
                      <div>
                          {/* <label htmlFor="">City<span>*</span></label> */}
                          <span>{errors.city?.type === "required" && "Thành phố không được để trống"}</span>
                          <input name='city' type="text" placeholder='Thành phố' {...register("city",{required:true})} />
                      </div>
                      <div>
                          {/* <label htmlFor="">National<span>*</span></label> */}
                          <span>{errors.national?.type === "required" && "Đất nước không được để trống"}</span>

                          <input name='national' type="text" placeholder='Quốc gia' {...register("national", { required: true })} />
                      </div>
                      <div>
                          <button>ĐẶT HÀNG</button>
                      </div>
                 </form>
            </div>
        </div>

        <div className='payment-sumary-payment'>                       
                        <span className='payment-sumary-payment-title' style={{textDecoration:'underline'}}>Thông tin đơn hàng</span>
                         <div className='list-prod-order'>
                            {
                                products && products.map(item=>{
                                    return (
                                    <div className='prod-item'>
                                        <img width={60} src={item.image} alt="" />
                                        <span>x {item.quantity}</span>
                                    </div>

                                    )
                                })
                            }
                         </div>
                        <span style={{position:'absolute', bottom:0}} className='payment-sumary-payment-total'>Tổng tiền:<mark style={{color:'blue',fontSize:20}}>{total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</mark></span>
              
                                    
                </div>
    </div>
  )
}

export default Address