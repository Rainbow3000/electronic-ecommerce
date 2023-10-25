import {configureStore} from '@reduxjs/toolkit'; 
import productSlice from './slice/productSlice';
import cartSlice from './slice/cartSlice';
import userSlice from './slice/userSlice';
import addressSlice from './slice/addressSlice';
import orderSlice from './slice/orderSlice';
import commentSlice from './slice/commentSlice';
import messageSlice from './slice/messageSlice';
export const store = configureStore({
    reducer:{
        product:productSlice,
        cart:cartSlice,
        user:userSlice,
        address:addressSlice,
        order:orderSlice, 
        comment:commentSlice,
        message:messageSlice
    }
})