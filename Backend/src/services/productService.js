const Product = require('../models/productModel'); 
const {cloudinary} = require('./../utils/cloudinary'); 
module.exports = {
    createProduct: (data)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                try {
                   const response = await Product.create(data);  
                   resolve(response); 
                } catch (error) {
                    reject(500).json(error);
                }
            } catch (error) {
                reject(error);
            }
        })
    },
    updateProduct:({productId,productUpdate})=>{
        return new Promise(async(resolve,reject)=>{
            Product.findByIdAndUpdate({ _id: productId }, productUpdate, {
                new: true
        }).then(product=>resolve(product)).catch(err=>resolve(err))
        })
    },
    getAllProduct:()=>{
        return new Promise((resolve,reject)=>{
            Product.find({}).then(product=>resolve(product)).catch(err=>reject(err))
        })
    }, 
    getSingleProduct:(productId)=>{
        return new Promise((resolve,reject)=>{
            Product.findById({_id:productId}).then(product=>resolve(product)).catch(err=>reject(err)); 
        })
    }, 
    deleteProduct:(productId)=>{
        return new Promise((resolve,reject)=>{
            Product.findByIdAndDelete({_id:productId}).then(product=>resolve(product)).catch(err=>reject(err)); 
        })
    }
}


