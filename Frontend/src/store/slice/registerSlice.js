import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

import {publicRequest} from '../../requestMethod'

export const userRegister = createAsyncThunk('user/register',async(user)=>{
     const response = await publicRequest.post('/auth/register',user); 
     return response.data; 
})


const registerSlice = createSlice({
    name:"register",
    initialState:{
        isFetching:false,
        register:null, 
        isError:false       
    }, 
    reducers:{
        registerStart(state,action){

        }, 
        registerSuccess(state,action){

        },
        registerFalure(state,action){

        }
    } ,
    extraReducers:(builder)=>{
        builder.addCase(userRegister.fulfilled,(state,action)=>{
            state.register = action.payload; 
        })
    }   
})

export const {registerStart,registerSuccess,registerFalure} = registerSlice.actions; 

export default registerSlice.reducer; 
