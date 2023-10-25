import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products:[],
        total:0     
    },
    reducers:{
        setCart(state,action){ 
            state.products = []; 
            state.total = 0; 
            state.products.push(...action.payload.products); 
            state.total = action.payload.total; 
        },
        addToCart(state,action){
            let equal = false; 
            const {_id,size,color} = action.payload; 
            state.products = state.products.map(item=>{
                if(item._id === _id && item.size === size && item.color === color ){
                    item.quantity += 1; 
                    equal = true; 
                }
                return item; 
            })
            if(equal === false){
                state.products.push(action.payload);             
            }
            const sum = state.products.map(item=>{
                return item.price * item.quantity; 
            }).reduce((current,next)=>{
                return current + next; 
            },0)
            state.total = sum ; 
            localStorage.setItem('cart',JSON.stringify({products:state.products,total:state.total}))
        }, 
        deleteCart(state,action){
            state.products = [];
            state.total = 0;
            state.products.push(...action.payload);
            const sum = state.products.map(item => {
                return item.price * item.quantity;
            }).reduce((current, next) => {
                return current + next;
            }, 0)
            state.total = sum;
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify({ products: state.products, total: state.total }))
        },
        updateCart(state,action){           
            state.products = []; 
            state.total = 0; 
            state.products.push(...action.payload);
            const sum = state.products.map(item => {
                return item.price * item.quantity;
            }).reduce((current, next) => {
                return current + next;
            }, 0)
            state.total = sum;
            localStorage.removeItem('cart'); 
            localStorage.setItem('cart', JSON.stringify({ products: state.products, total: state.total }))
        },
        clearCart(state,action){
            state.products = [];
            state.total = []; 
            localStorage.removeItem('cart'); 
        }
    }
})

export const {addToCart,updateCart,deleteCart,setCart,clearCart} = cartSlice.actions; 

export default cartSlice.reducer; 
