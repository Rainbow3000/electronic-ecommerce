import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {publicRequest, userRequest} from '../../requestMethod'; 

export const createComment = createAsyncThunk(
    "comment/create-comment",
    async(data)=>{
        try {     
            const response = await userRequest.post("/create-comment",data); 
            return response.data; 
        } catch (error) {
           console.log(error);  
        }
    }
)

export const getAllComment = createAsyncThunk(
    "comment/get-all-comment", async(productId)=>{
        try {     
            const response = await publicRequest.get(`/getAllComment/${productId}`); 
            return response.data; 
        } catch (error) {
            console.log(error); 
        }
    }
)


const commentSlice = createSlice({
    name:'comment',
    initialState:{
        comments:[]
    }, 
    extraReducers:(builder)=>{
        builder.addCase(getAllComment.fulfilled,(state,action)=>{
            state.comments = action.payload; 
        })
    }

})



export default commentSlice.reducer; 