const mongoose = require('mongoose'); 

const Product  = new mongoose.Schema({
    name: { type: String, required: true},
    desc:{type:String,},
    image:{type:String,default:""},
    price:{type:Number,},
    priceOld:{type:Number},
    color:{type:String},
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
        required:true
     }, 
},{timestamps:true})


module.exports = mongoose.model('Product',Product); 