import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from '../../requestMethod'

export const createOrderUser = createAsyncThunk(
    'order/createOrder', async ({order}) => {
            const response = await userRequest.post('/order',order);
            return response.data;
    }
)

export const getOrderByUserId = createAsyncThunk(
    "order/getOrderByUserId", async(_id)=>{
        const response = await userRequest.get(`/order/${_id}`); 

        return response.data; 
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        isOrderSuccess: false,
        orderByUser:[], 
    },
    reducers: {
        createOrderEnd(state, action) {
            state.isOrderSuccess = false;
        }
    },
    extraReducers: (builder) => {
     
        builder.addCase(createOrderUser.fulfilled, (state, action) => {
            state.isOrderSuccess = true;
        })

        builder.addCase(getOrderByUserId.fulfilled,(state,action)=>{
            state.orderByUser = action.payload; 
        })
    }

})

export const { createOrderEnd } = orderSlice.actions;
export default orderSlice.reducer; 