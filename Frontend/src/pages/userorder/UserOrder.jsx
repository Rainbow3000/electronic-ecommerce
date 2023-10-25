import './userorder.scss'
import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { createMessage } from '../../store/slice/messageSlice';
import {getOrderByUserId} from '../../store/slice/orderSlice'
import {STATE_ORDER} from '../../enum/Enum'
let userEmail = null; 
const UserOrder = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const {orderByUser} = useSelector(state=>state.order); 
    console.log(orderByUser);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')); 
        if(!user){
            navigate('/login'); 
            return; 
        }
        const {_id} = user; 
        userEmail = user.email; 
        dispatch(getOrderByUserId(_id)); 
    },[])

    const handleClickCancel = (type,id)=>{
         const data = {
            typeMessage:type,
            body:{
                productId:id
            }
         }
        dispatch(createMessage(data)); 
    }
  return (
    <div className='table-container-order'>
        <table class="content-table">
    <thead>
        <tr>
        <th>STT</th>
        <th>Ảnh</th>
        <th>Tên</th>
        <th>Màu</th>
        <th>Số Lượng</th>
        <th>Tổng tiền</th>
        <th>Trạng thái</th>
        </tr>
    </thead>
    <tbody>
    {
                            orderByUser && orderByUser.map((item,index)=>{
                            
                                return item.product.map(productOrder=>{
                                    return <tr className='tr-my-order'>
                                        <td>{index + 1}</td>
                                        <td><img width={120} src={productOrder.image} /></td>
                                        <td>{productOrder.productName}</td>
                                        <td>{productOrder.color}</td>
                                        <td>{productOrder.quantity}</td>
                                        <td>{productOrder.total}</td>
                                        <td> <mark>{STATE_ORDER[item.status]}</mark></td>                                     
                                    </tr>
                                })
                                
                            })
                        }
    </tbody>
        </table>
    </div>
  )
}

export default UserOrder