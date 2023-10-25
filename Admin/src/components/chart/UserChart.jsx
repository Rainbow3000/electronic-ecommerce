import React,{useMemo,useEffect,useState} from 'react'
import {Paper,Box} from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch,useSelector } from 'react-redux';
import './userChart.scss'
const UserChart = () => {
    const {userStat} = useSelector(state=>state.user); 
    const dispatch = useDispatch();   
    const MONTHS = useMemo(()=>[
        "January",
        "February", 
        "March", 
        "April",
        "May",
        "June",
        "July",
        "August",
        "September", 
        "October",
        "November",
        "December"
    ])

    const data = userStat.map((item,index)=>{
        return {name:MONTHS[item._id -1 ], activeUser:item.quantity}
    })
   
  return (
        <Box sx={{width:"100%",flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box>
            <ResponsiveContainer width="100%" height="100%">
                <Paper className='paper-chart'>
                    <LineChart
                        width={600}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right:5,
                            left:5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />              
                        <Tooltip />
                        <Legend />
                          <Line type="monotone" dataKey="activeUser" stroke="blue" />
                    </LineChart>
                </Paper>
                </ResponsiveContainer>
            </Box>
        </Box>
  )
}

export default UserChart