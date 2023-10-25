import { Box, Paper, Typography } from '@mui/material'
import React,{useEffect} from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import {useSelector,useDispatch} from 'react-redux'
import {getOrderStat,getOrderIncome,getReturnOrder} from '../../redux/slices/orderSlice'
import "./featured.scss"
const Featured = () => {
    const {orderStat,orderIncome,orderReturn} = useSelector(state=>state.order);

    const dispatch = useDispatch(); 
    useEffect(()=>{
        dispatch(getOrderStat()); 
        dispatch(getReturnOrder());
        dispatch(getOrderIncome());
    },[dispatch])


    const date = new Date(); 
    const monthNow  = date.getMonth() + 1;  
    let percentOrderThisMonthComparePreMonth;
    let orderThisMonth; 
    let orderPreMonth;
    if(orderStat.length > 0){
        orderThisMonth = orderStat.find(item=>item._id === monthNow - 1);
        orderPreMonth = orderStat.find(item=>item._id === monthNow - 2); 
        percentOrderThisMonthComparePreMonth = orderThisMonth && orderPreMonth && (orderThisMonth.total - orderPreMonth.total) / orderPreMonth.total * 100; 
    }
  return (
     <Box sx={{marginTop:15,display:'flex',justifyContent:'space-around'}}>
        <Paper className='paperFeatured' sx={{display:'flex',alignItems:'center',justifyContent:'center',width:"20%",height:200}}>
            <Box>
                <Typography variant="h5" fontWeight="600">Total Order This Month</Typography>
                  <Typography variant='h3' fontWeight="bold">{orderThisMonth && orderThisMonth.total}</Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>{percentOrderThisMonthComparePreMonth && percentOrderThisMonthComparePreMonth > 0 ? <ArrowUpwardOutlinedIcon sx={{ color: 'green' }} /> : <ArrowDownwardOutlinedIcon sx={{ color: 'red' }} />}Compared to last month</Typography>
            </Box>
            <Box>
                <ShoppingCartOutlinedIcon fontSize='large' color='success'/>
            </Box>
        </Paper>
          <Paper className='paperFeatured' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "20%", height: 200 }}>
              <Box>
                  <Typography variant="h5" fontWeight="600">Total Sales</Typography>
                  <Typography variant='h3' fontWeight="bold">33</Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}><ArrowUpwardOutlinedIcon sx={{ color: 'green' }} />Compared to last month</Typography>
              </Box>
              <Box>
                  <ShoppingCartCheckoutOutlinedIcon fontSize='large' color="warning" />
              </Box>
          </Paper>
          <Paper className='paperFeatured' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "20%", height: 200 }}>
              <Box>
                  <Typography variant="h5" fontWeight="600">Total Benefit</Typography>
                  <Typography variant='h3' fontWeight="bold">{orderIncome && orderIncome.sumThisMonth}</Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>{orderIncome && orderIncome.percent > 0 ?<ArrowUpwardOutlinedIcon sx={{ color: 'green' }} />: <ArrowDownwardOutlinedIcon sx={{ color: 'red' }} />}Compared to last month</Typography>
              </Box>
              <Box>
                  <LocalAtmOutlinedIcon fontSize='large' sx={{ color:'#c6c90e'}} />
              </Box>
          </Paper>
          <Paper className='paperFeatured' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "20%", height: 200 }}>
              <Box>
                  <Typography variant="h5" fontWeight="600">Total Return</Typography>
                  <Typography variant='h3' fontWeight="bold">{orderReturn && orderReturn.returnThisMonth}</Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>{orderReturn && orderReturn.percent > 0 ? <ArrowUpwardOutlinedIcon sx={{ color: 'green' }} /> :<ArrowDownwardOutlinedIcon sx={{ color: 'red' }} />}Compared to last month</Typography>
              </Box>
              <Box>
                  <AssignmentReturnedOutlinedIcon fontSize='large' sx={{color:"red"}} />
              </Box>
          </Paper>
     </Box>
  )
}

export default Featured