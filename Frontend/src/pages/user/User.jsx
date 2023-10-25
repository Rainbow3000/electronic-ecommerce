import React,{useEffect} from 'react'
import "./user.scss"
import {useDispatch,useSelector} from "react-redux";
import {getOrderByUserId} from '../../store/slice/orderSlice'
import {createMessage} from '../../store/slice/messageSlice'
import {useNavigate} from 'react-router-dom'

let userEmail = null; 
const User = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const {orderByUser} = useSelector(state=>state.order); 
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
        <div className='user-container'>
            <div className="user-order">
                <h1>Your Order</h1>
                <div style={{ width: "30vh", height: 5, backgroundColor: "#333", margin: "0 auto",marginBottom:30 }}></div>
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>status</th>
                        <th>option</th>
                    </tr>
                    {
                        orderByUser && orderByUser.map(item=>{
                            if(item.status !== "Cancelled"){
                            return item.product.map(productOrder=>{
                                return <tr>
                                    <td><img width={120} src={productOrder.image} /></td>
                                    <td>{productOrder.productName}</td>
                                    <td>{productOrder.color}</td>
                                    <td>{productOrder.size}</td>
                                    <td>{productOrder.quantity}</td>
                                    <td>{productOrder.total}</td>
                                    <td>{item.status}</td>
                                    <td><button onClick={()=>handleClickCancel("cancel-order",item._id)} >Cancel</button></td>
                                </tr>
                            })
                            }
                        })
                    }
                   
                </table>
            </div>
            <div className="user-profile">
                <h1>Your Info</h1>
                <div style={{ width: "30vh", height: 5, backgroundColor: "#333", margin: "0 auto", marginBottom: 30 }}></div>
                <form>
                    <div>
                        <label style ={{textAlign:'left'}}>Email</label>
                        <input value={userEmail} />
                    </div>
                    <div>
                        <label style={{ textAlign: 'left' }}>Status</label>
                        <input value="active" />
                    </div>
                    
                    <button>Forget Password ?</button>
                
                </form>
            </div>
        </div>
    )
}

export default User