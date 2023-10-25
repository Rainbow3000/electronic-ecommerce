import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {publicRequest} from '../../requestMethod'
export const userLogin = createAsyncThunk("user/login",async(user)=>{
            const response = await publicRequest.post('/auth/login',user);
            return response.data; 
})

const userSlice = createSlice({
    name:"user",
    initialState:{
        isFetching:false, 
        user:null,
        isError:false, 
        errorMessage: {}   
    },
    reducers:{
        loginStart(state,action){
            state.isFetching = true; 
            state.isError = false
        },
        loginSuccess(state,action){
            state.user = action.payload;
            state.isFetching = false
            state.isError = false
        },
        loginFalure(state,action){
            state.isFetching = false; 
            state.user = null; 
            state.isError = true; 
        },
        logout(state,action){
            localStorage.removeItem('user'); 
            state.user = null; 
            state.isFetching = false; 
            state.isError = false; 
            localStorage.removeItem('address-user');
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.user && localStorage.setItem('user',JSON.stringify(action.payload));
            state.isFetching = false 
            state.isError = false
        }).addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage.login = "email or password incorrect !"; 
        })

        
    }
})




export const { loginStart,loginSuccess,loginFalure,logout}  = userSlice.actions; 
export default userSlice.reducer; 