import React from 'react'
import Box from '@mui/material/Box'
import { Container} from '@mui/system'
import { Toolbar,AppBar,Typography,IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Badge from '@mui/material/Badge';
import {useDispatch,useSelector} from 'react-redux'
import {userLogout} from '../../redux/slices/userSlice'
import {useNavigate,Link} from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const {messages}  = useSelector(state=>state.message);  
  const handleLogout = ()=>{
    dispatch(userLogout()); 
    navigate('/login'); 
  }
  return (
      <Box sx={{backgroundColor:'white'}}>
          <Box>
              <AppBar sx={{ width:"85%", backgroundColor:"#333",top:0}} position="fixed">
                    <Toolbar>                   
                             <Box sx={{width:"100%",display:'flex',justifyContent:"flex-end",alignItems:'center'}}>                                   
                                 <span>ĐĂNG XUẤT</span>
                                <IconButton onClick={handleLogout}>
                                    <LogoutOutlinedIcon sx={{ cursor: 'pointer', color: "white" }} />
                                </IconButton>
                             </Box>
                    </Toolbar>
                </AppBar>
          </Box>
     </Box>
  )
}

export default Navbar