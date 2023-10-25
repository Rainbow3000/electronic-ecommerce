import React from 'react'
import './detailsOrder.scss'; 
import {Paper,Box} from '@mui/material'
import {useLocation} from "react-router-dom"
import {useSelector} from "react-redux"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import xlsx from 'xlsx'
const DetailsOrder = () => {
  const location = useLocation(); 
  const path = location.pathname.split("/")[3];
  const {orders} = useSelector(state=>state.order); 
  const userOrder = orders.find(item=>{
    return item._id === path; 
  })
  return (
        <Box className='order-details-container'>
      

             <h3 style={{marginTop:20}}>CHI TIẾT ĐƠN HÀNG</h3>
            
      <TableContainer style={{border:'1px solid red',marginTop:20}} component={Paper}>
        <Table sx={{ minWidth: 650,textAlign:'center' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Ảnh</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Mô tả</TableCell>
              <TableCell align="center">Màu</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrder.product && userOrder.product.map((row,index) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0} }}
              >
                <TableCell align="center"><img style={{ borderRadius: "50%" }} src={row.image} width={60} height={60} /></TableCell>
                <TableCell align="center">{row.productName}</TableCell>
                <TableCell align="center">{row.productDesc}</TableCell>
              
                <TableCell align="center">{
                       row.color
                }</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell style={{color:'blue'}} align="center">{row.total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{mt:10}}>
        <h3>TỔNG ĐƠN HÀNG :<mark style={{color:'blue'}}>{userOrder.totalOrder.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} </mark></h3>
        {/* <button>Xuất Excel</button> */}
      </Box>
        </Box>
  )
}

export default DetailsOrder