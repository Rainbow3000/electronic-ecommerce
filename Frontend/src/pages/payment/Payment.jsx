import {React,useEffect,useState} from 'react'
import './payment.scss'
import AddressStage from '../../components/addressStage/AddressStage'
import PaypalCheckoutButton from '../../components/paypalCheckoutButton/PaypalCheckoutButton'
import {useSelector,useDispatch } from 'react-redux'
import {updateAddress} from '../../store/slice/addressSlice'; 
import moment from 'moment';
import {createOrderUser,createOrderEnd} from '../../store/slice/orderSlice'
import { useNavigate,Link } from 'react-router-dom'
import { clearCart } from '../../store/slice/cartSlice';
const Payment = () => {
  const dispatch = useDispatch(); 
  const {products,total} = useSelector(state=>state.cart);  
  const {addressUser} = useSelector(state=>state.address); 
  const {user} = useSelector (state=>state.user);  
  const [payMethod,setPayMethod] = useState("payOnline"); 
  const { isOrderSuccess } = useSelector(state=>state.order);
  const navigate = useNavigate();
  useEffect(()=>{
      const addressUser = JSON.parse(localStorage.getItem('address-user')); 
      if(addressUser){
        const { address, phone, city, national } = addressUser;
        const userAddress = {
          address, phone, city, national
        }
        dispatch(updateAddress({ userAddress: userAddress })) 
      }
  },[])
  if(!user){
    navigate('/login'); 
  }

  if (addressUser.phone === "" || addressUser.address === "" || addressUser.city === ""){
    navigate('/address'); 
  }

  const filterProducts = products.map(item => {
    return {productDesc: item.desc,productName: item.name,productId: item._id, quantity: item.quantity, total: item.quantity * item.price, size: item.size, color: item.color,image:item.image[0] }
  })

  const handleOrderOffline = ()=>{
    const {address, phone} = addressUser;
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
    <div className='payment-container'>
        <div className="payment-wraper">
            <Link to="/cart" className='btn-payment-back'>Trờ về</Link>
            <div>
                <div className='payment-list-order'>
                           
                      {/* <div className="payment-delimiter"></div>
                      {products.map(item=>{
                        return <div className='payment-list-product'>
                            <img alt='' src={item.image} />
                            <div className='payment-list-info'>
                                <h1>{item.name}</h1>
                            <span style={{ color: 'black', fontWeight: 'bold' }} className='payment-list-info-des'>{item.desc}</span>
                                <span style={{color:'black',fontWeight:'bold'}}>Giá : <b>{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b></span>
                            <span style={{ color: 'black', fontWeight: 'bold' }}>Số lượng: x{item.quantity}</span>
                                <div className='payment-list-info-tail'>
                                        <div style={{backgroundColor:`${item.color}`}} className='payment-list-info-color'></div>
                              <div className='payment-list-total'><span style={{fontSize:25}}>Tổng tiền: {(item.quantity * item.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></div>
                                </div>
                            </div>
                        </div>  
                      })}                   
                      */}
                </div>
                <div className='payment-sumary-payment'>                       
                      <span className='payment-sumary-payment-title'>Thông tin đơn hàng</span>
                    <div>
                        <ul>
                          <li><b>Địa chỉ:</b><span style={{ color: 'gray'}}>{addressUser.address}</span></li>
                          <li style={{marginTop:10}}><b>Số điện thoại:</b><span style={{ color: 'gray'}}>{addressUser.phone}</span></li>
                          <li style={{marginTop:10}}><b>Thành phố:</b><span style={{ color: 'gray'}}>{addressUser.city}</span></li> 
                        </ul>
                        <div className='payment-sumary-delimiter'></div>
                  </div>
                    <span className='payment-sumary-payment-total'>Tổng tiền:<mark>{total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</mark></span>
                  <div className='payment-sumary-delimiter'></div>
                      <div className="payment-sumary-options-pay-order">
                         
                          
                      </div>      
                          <button className='btn-receive-and-pay' onClick={handleOrderOffline}>
                              Đặt Hàng
                          </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment