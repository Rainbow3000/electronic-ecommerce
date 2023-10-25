import React,{useEffect} from 'react'
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@mui/material'
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import {useSelector} from "react-redux"; 
import './listUser.scss'
 const ListUser = () => {
 const {users} = useSelector(state=>state.user); 
  return (
      <Paper className='paper-list-user' sx={{ width:'100%',height: 500, overflowX: 'hidden',display:'flex',flexDirection:'column',alignItems:'center'}} >
            <Table className='user-table'>
                <tr>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
            
                    {users && users.map(item=>{
                        return <tr>
                            <td style={{color:'#333'}}>{item.userName}</td>
                            <td style={{color:'#333'}}>{item.email}</td>
                            <td style={{ color:item.status ==="Active"?"green":"red",fontWeight:'bold'}}>{item.status}</td>
                        </tr> 
                    })}
            </Table>
       </Paper>
  )
}

export default ListUser