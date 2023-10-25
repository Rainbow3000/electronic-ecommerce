const env = require('dotenv'); 
env.config(); 
const express = require('express'); 
const app = express(); 

const cors = require('cors');
app.use(cors()); 

const mongoose = require('mongoose'); 

const productRouter = require('./src/routers/productRouter'); 
const categoryRouter = require('./src/routers/categoryRouter'); 
const userRouter = require('./src/routers/userRouter')
const authRouter = require('./src/routers/authRouter')
const orderRouter = require('./src/routers/orderRouter')

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db is connected !'))
.catch(err=>console.log(err))

app.use(express.json()); 

const PORT = process.env.PORT || 5000


app.use(productRouter); 
app.use(userRouter); 
app.use(orderRouter); 
app.use(authRouter); 
app.use(categoryRouter);  



app.listen(PORT,()=>console.log(`server is runing at http://localhost:${PORT}`))

