import React,{useEffect} from 'react'
import {Box,Grid} from '@mui/material'
import Featured from '../../components/featured/Featured'
import ListUser from '../../components/listUser/ListUser'
import UserChart from '../../components/chart/UserChart'
import {useDispatch} from 'react-redux'; 
import {useNavigate} from 'react-router-dom'
import {getUsers,getUserStat} from '../../redux/slices/userSlice'
const Home = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user || !user.isAdmin){
         navigate('/login'); 
    }
  },[])

  useEffect(()=>{
      dispatch(getUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(getUserStat());
  }, [dispatch])
  

  return (
    <Box sx={{width:"100%"}}>
        <Box sx={{display:"flex",justifyContent:'space-between',width:'100%',flexDirection:'column'}}>
            
        </Box>
    </Box>
  )
}

export default Home