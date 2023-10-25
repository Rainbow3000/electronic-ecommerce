import React,{useEffect} from 'react'
import "./message.scss"
import {getAllMessageUser} from '../../redux/slices/messageSlice'
import {useDispatch,useSelector} from 'react-redux'
const Message = () => {
    const dispatch = useDispatch(); 
    const {messages} = useSelector(state=>state.message); 
    useEffect(()=>{
        dispatch(getAllMessageUser()); 
    },[])
  return (
    <div className='message-container'>
        <ul>
            <li>ORDER</li>
            <li>OTHER</li>
            <li>WATCHED</li>
        </ul>
        <table>
            <tr>
                <th>STT</th>
                <th>Type</th>
                <th>Content</th>
                <th>Options</th>
            </tr>
            {
                messages && messages.map((item,index)=>{
                    return <tr>
                        <td>{index + 1}</td>
                        <td>{item.typeMessage}</td>
                        <td>{item.body.productId}</td>
                        <td><button>Mark As Read</button></td>
                    </tr>
                })
            }
        </table>
    </div>
  )
}

export default Message