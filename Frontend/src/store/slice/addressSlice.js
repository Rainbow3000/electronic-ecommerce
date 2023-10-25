import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name:"payment", 
    initialState:{
        addressUser:{
            address:"", 
            phone:"",
            city:"",
            national:"",
        }
    },
    reducers:{
        updateAddress(state,action){
            state.addressUser = action.payload.userAddress; 
            const userAddress = JSON.parse(localStorage.getItem('address-user'));
            userAddress && localStorage.removeItem("address-user");
            localStorage.setItem("address-user",JSON.stringify(action.payload.userAddress));
        }, 
    }
})


export const {updateAddress,updateAll}  = addressSlice.actions; 
export default addressSlice.reducer; 