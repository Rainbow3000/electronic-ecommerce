import {React, useState} from 'react'
import {PayPalButtons} from '@paypal/react-paypal-js'
// import { publicRequest } from '../../requestMethod'
import { useDispatch} from 'react-redux'
import { publicRequest,userRequest } from '../../requestMethod';
import { useNavigate } from 'react-router-dom';
import {clearCart} from '../../store/slice/cartSlice'; 
import moment from 'moment';
const PaypalCheckoutButton = ({products,totalPay,addressUser,user}) => {
  const [paidFor,setPaidFor] = useState(false); 
  const [error,setError] = useState(null); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  let order = null; 
  const handleApprove = (orderID)=>{ 
      if(orderID){
        setPaidFor(true); 
         const filterProducts = products.map(item=>{
      return {productDesc:item.desc, productName:item.name,productId:item._id,quantity:item.quantity,total:item.quantity * item.price,size:item.size, color:item.color,image:item.image}
    })
     order = {
      userId : user._id, 
      userName : user.userName, 
      products:[...filterProducts],
      totalOrder:totalPay,
      phone:addressUser.phone, 
      address:addressUser.address,
      methodPay:"paypal",
      email:user.email,
      isPaid:true, 
      isDelivered:false, 
      deliveredAt:"", 
      paidAt:moment().format('MMMM Do YYYY, h:mm:ss a'), 
      orderDate: moment().format('MMMM Do YYYY, h:mm:ss a'), 
      resultOrder: "pending" 
    }
      } 
  }
  
  if(paidFor === true){
    const paymentFullFilled  = async()=>{
        try {
          const result = await userRequest.post('/order',order); 
          if(result.data){
              dispatch(clearCart()); 
              navigate('/'); 
          }
        } catch (error) {
           console.log(error);
        }
    }
    paymentFullFilled(); 
  }

  if(error){
    alert(error)
  }
  return <PayPalButtons 
  style={{color:"silver",layout:"horizontal",height:48,tagline:false}}
  createOrder = {(data,actions)=>{
      return actions.order.create({
        purchase_units:[
          {
            description:"payment with paypal", 
            amount:{
              value:totalPay
            }
          }
        ]
      })
  }}
  onClick = {(data,actions)=>{
    console.log(data);
  }}
  onApprove = {async(data,actions)=>{
      const order = await actions.order.capture();
      console.log("order",order); 
      handleApprove(data.orderID);
  }}
  onCancel = {()=>{

  }}
  onError={(err)=>{
    setError(err); 
    console.error("payment error:",err); 
  }}
  />
}

export default PaypalCheckoutButton