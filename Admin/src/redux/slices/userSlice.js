import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { publicRequest,userRequest } from '../../requestMethod';

export const getUsers = createAsyncThunk(
    'user/getUsers',async()=>{
            const response = await userRequest.get('/user'); 
            return response.data; 
    }
)

export const userLogin = createAsyncThunk(
    'user/userLogin',async(user)=>{
            const response = await publicRequest.post('/auth/login',user); 
            return response.data; 
    }
)

export const getUserStat = createAsyncThunk(
    'user/userStat', async()=>{
        const response = await userRequest.get('user/userStat'); 
        return response.data;
    }
)

const userSlice = createSlice({
    name:'user',
    initialState:{
        users:[],
        user: JSON.parse(localStorage.getItem('user')),
        isLogin:false,
        errorMessage:{}, 
        userStat:[], 
    },
    reducers:{
        userLogout(state,action){
            state.users = [];
            localStorage.removeItem('user'); 
            state.user = JSON.parse(localStorage.getItem('user')); 
            state.errorMessage = {}           
        }
    }, 
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.isLogin = true; 
        }).addCase(userLogin.fulfilled,(state,action)=>{
            if(action.payload.isAdmin === false){
                alert('Tài khoản không được phép !');
                return;  
            }
            localStorage.setItem('user',JSON.stringify(action.payload));
            state.user = action.payload;
            state.isLogin = false
        }).addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage.login = "Email or password incorrect !"; 
        }) 

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })

        builder.addCase(getUserStat.fulfilled,(state,action)=>{
            state.userStat = action.payload; 
        })
    }
})

export const {userLogout} = userSlice.actions; 

export default userSlice.reducer; 