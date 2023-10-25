import React,{useEffect,useState} from 'react'
import './orderList.scss'
import {Box, Paper} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useDispatch,useSelector} from 'react-redux'
import {getOrderUser,updateOrderUser} from '../../redux/slices/orderSlice'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {getOrderCompareStat,exportToExcel} from '../../redux/slices/orderSlice'
import Button from '@mui/material/Button';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import { Link,useNavigate } from 'react-router-dom';
import { fetchProducts,deleteProduct } from '../../redux/slices/productSlice'
import EventNoteIcon from '@mui/icons-material/EventNote';
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const stateOrder = [
  "CHỜ DUYỆT", "CHỜ GIAO HÀNG",
  "ĐANG GIAO HÀNG", "ĐÃ GIAO HÀNG","ĐƠN ĐÃ HỦY"
]

const OrderList = () => {
  const iState = JSON.parse(localStorage.getItem('indexState')); 
  const oState = JSON.parse(localStorage.getItem('orderState')); 
  const [indexState,setIndexState] = useState( iState && iState); 
  const [orderState, setOrderState] = useState( oState && oState);
  localStorage.setItem('indexState', JSON.stringify(indexState));  
  localStorage.setItem('orderState', JSON.stringify(orderState));  
  const dispatch = useDispatch(); 
  let navigate = useNavigate(); 
  const {orders} = useSelector(state=>state.order); 
  console.log('orders',orders);
  const {orderCompare} = useSelector(state=>state.order); 
  const ordersPending = orders.filter(item=>{
    return item.status === "Pending"
  })
  const orderWaitingDelivery = orders.filter(item => {
    return item.status === "Waiting Delivery"
  })
  const orderDelivering = orders.filter(item => {
    return item.status === "Delivering"
  })
  const orderSuccess = orders.filter(item => {
    return item.status === "Success"
  })

  const orderCancel = orders.filter(item => {
    return item.status === "Cancelled"
  })
  const handleConfirmOrder = (orderId)=>{
      const userOrder = orders.find(item=>{
        return item._id === orderId; 
      }); 
      const order = {...userOrder,status:"Waiting Delivery"}
      dispatch(updateOrderUser({data:order,orderId}));
      navigate(0);
  }
  const handleDelivery= (orderId) => {
    const userOrder = orders.find(item => {
      return item._id === orderId;
    });
    const order = { ...userOrder, status: "Delivering" }

    dispatch(updateOrderUser({ data: order, orderId }));
    navigate(0);
  }
  const handleSuccess = (orderId) => {
    const userOrder = orders.find(item => {
      return item._id === orderId;
    });
    const order = { ...userOrder, status: "Success",isPaid:true}

    dispatch(updateOrderUser({ data: order, orderId }));
    navigate(0);
  }
  const handleCancel = (orderId) => {
    const userOrder = orders.find(item => {
      return item._id === orderId;
    });
    const order = { ...userOrder, status: "Cancelled" }

    dispatch(updateOrderUser({ data: order, orderId }));
    navigate(0);
  }

  const handleClickState = (item,index)=>{
       setOrderState(item);
       setIndexState(index); 
  }

  const currentMonth = new Date().getMonth() + 1;
  const listSuccess = orderCompare && orderCompare.orderSuccess; 
  const listCancel = orderCompare && orderCompare.orderCancelled; 
  let newListSuccess = listSuccess && [...listSuccess]; 
  let newListCancel = listCancel && [...listCancel]; 
  for(let i = 1; i <= currentMonth ; i++){
    const dataFind = listSuccess && listSuccess.find(item=>{
        return item._id === i; 
      })
      if(!dataFind){
        newListSuccess && newListSuccess.push({_id:i,totalSuccess:0}); 
        newListSuccess  = newListSuccess && newListSuccess.sort((a,b)=>a._id - b._id); 
      }
  }
  for (let i = 1; i <= currentMonth; i++) {
    const dataFind = listCancel && listCancel.find(item => {
      return item._id === i;
    })
    if (!dataFind) {
      newListCancel && newListCancel.push({ _id: i, totalCancelled: 0 });
      newListCancel = newListCancel && newListCancel.sort((a, b) => a._id - b._id);
    }
  }

  const data = newListSuccess && newListSuccess.map((item,index)=>{
      return {
        name:item._id, 
        success:item.totalSuccess, 
        cancel:newListCancel[index].totalCancelled,
      }
  })

 
  const handleExportExcel = ()=>{  
      dispatch(exportToExcel(orderSuccess)); 
      alert('Export to excel success !'); 
  }

  useEffect(()=>{
      dispatch(getOrderUser()); 
      dispatch(getOrderCompareStat()); 
  },[dispatch])
  return (
    <>
     
      <Box className='order-list-container' style={{marginTop:120}}>

            <ul>
                {
                  stateOrder.map((item,index)=>{
                    return <li className={indexState === index ?"index-active":""} onClick={()=>handleClickState(item,index)}>{item}</li>
                  })
                }
            </ul>
            <Box sx= {{mt:5,width:'100%'}}>
              {
            orderState === "CHỜ DUYỆT" && <Paper>
              <TableContainer component={Paper} style={{border:'1px solid blue'}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>               
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">NGÀY ĐẶT</TableCell>
                      <TableCell align="center">PHƯƠNG THỨC THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI ĐƠN HÀNG</TableCell>
                      <TableCell align="center">THAO TÁC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersPending.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 },height:120 }}
                      >
                       
                       
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Đã thanh toán</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >Chưa thanh toán</span>}</TableCell>
                        <TableCell align="center">{
                          row.status === "Success" ? <span style={{ backgroundColor:"#86eb34"}}>{row.status}</span>:
                            <span style={{ backgroundColor: "#86eb34" }}>Chờ duyệt</span>
                        }</TableCell>

                        <TableCell sx={{ display: 'flex',alignItems:'center' }} align="center">
                        <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, marginTop:40,border:'1px solid gray' }}><ContentPasteSearchIcon/></button></Link>
                          <button onClick={() => handleConfirmOrder(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5,  marginTop:40,width:'auto',border:'1px solid gray' }} ><CheckOutlinedIcon sx={{ color: 'green' }} /></button>
                          <button onClick={() => handleCancel(row._id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 10, color: 'red', background: 'none', borderRadius: 5,marginTop: 40,border:'1px solid gray' }}><DeleteOutlineOutlinedIcon /></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
              }

              {
            orderState === "CHỜ GIAO HÀNG" && <Paper>
              <TableContainer component={Paper} style={{border:'1px solid blue'}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                    
                      
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">NGÀY ĐẶT</TableCell>
                      <TableCell align="center">PHƯƠNG THỨC THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI ĐƠN HÀNG</TableCell>
                      <TableCell align="center">THAO TÁC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderWaitingDelivery.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 },height:120 }}
                      >
                       
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Đã thanh toán</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >Chưa thanh toán</span>}</TableCell>
                        <TableCell align="center">Chờ giao</TableCell>

                        <TableCell sx={{ display: 'flex',alignItems:'center' }} align="center">
                          <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5,border:'1px solid gray',marginTop:40 }}><ContentPasteSearchIcon/></button></Link>
                          <button onClick={() => handleDelivery(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5,border:'1px solid gray',marginTop:40 }} > <CheckOutlinedIcon sx={{ color: 'green' }} /></button>
                          <button onClick={() => handleCancel(row._id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 10, color: 'red', background: 'none', borderRadius: 5, mt: 5 ,border:'1px solid gray',marginTop:40}}><DeleteOutlineOutlinedIcon /></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
              }
              {

            orderState === "ĐANG GIAO HÀNG" && <Paper>
              <TableContainer component={Paper} style={{border:'1px solid blue'}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                     
                    
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">NGÀY ĐẶT</TableCell>
                      <TableCell align="center">PHƯƠNG THỨC THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI ĐƠN HÀNG</TableCell>
                      <TableCell align="center">THAO TÁC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDelivering.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 },height:120 }}
                      >
                       
                      
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Đã thanh toán</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >Chưa thanh toán</span>}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>

                        <TableCell sx={{ display: 'flex',alignItems:'center' }} align="center">
                        <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, marginTop:40,border:'1px solid gray' }}><ContentPasteSearchIcon/></button></Link>
                          <button onClick={() => handleSuccess(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5,border:'1px solid gray',marginTop:40 }} ><CheckOutlinedIcon sx={{ color: 'green' }} /></button>
                          <button onClick={() => handleCancel(row._id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 10, color: 'red', background: 'none', borderRadius: 5, mt: 5,border:'1px solid gray',marginTop:40 }}><DeleteOutlineOutlinedIcon /></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

              }

              {

            orderState === "ĐÃ GIAO HÀNG" && <Paper>
              <TableContainer component={Paper} style={{border:'1px solid blue'}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      
                    
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">NGÀY ĐẶT</TableCell>
                      <TableCell align="center">PHƯƠNG THỨC THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI ĐƠN HÀNG</TableCell>
                      <TableCell align="center">THAO TÁC</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderSuccess.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 },height:120 }}
                      >
                        
                       
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Đã thanh toán</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >Chưa thanh toán</span>}</TableCell>
                        <TableCell align="center">Hoàn tất</TableCell>

                        <TableCell sx={{ display: 'flex',alignItems:'center' }} align="center">
                          <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, marginTop:40,border:'1px solid gray' }}><ContentPasteSearchIcon/></button></Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </Paper>
              }
              {

            orderState === "ĐƠN ĐÃ HỦY" && <Paper>
              <TableContainer component={Paper} style={{border:'1px solid blue'}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                     

                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">NGÀY ĐẶT</TableCell>
                      <TableCell align="center">PHƯƠNG THỨC THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI THANH TOÁN</TableCell>
                      <TableCell align="center">TRẠNG THÁI ĐƠN HÀNG</TableCell>
                      <TableCell align="center">THAO TÁC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderCancel.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 },height:120 }}
                      >
                       
                    
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Đã thanh toán</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >Chưa thanh toán</span>}</TableCell>
                        <TableCell sx={{color:'red',fontWeight:'bold'}} align="center">Đã hủy đơn</TableCell>

                        <TableCell sx={{ display: 'flex',alignItems:'center' }} align="center">
                        <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, marginTop:40,border:'1px solid gray' }}><ContentPasteSearchIcon/></button></Link>
                          <button onClick={() => handleConfirmOrder(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5,marginTop:40 }} ><CheckOutlinedIcon sx={{ color: 'green' }} /></button> 
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
              }
            </Box>
      </Box> 
    </>
  )
}

export default OrderList

