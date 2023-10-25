const Category = require('../models/categoryModel'); 
module.exports = {
    createCategory: (data)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                try {
                   const response = await Category.create(data);  
                   resolve(response); 
                } catch (error) {
                    reject(500).json(error);
                }
            } catch (error) {
                reject(error);
            }
        })
    },
    updateCategory:({categoryId,categoryUpdate})=>{
        return new Promise(async(resolve,reject)=>{
            Category.findByIdAndUpdate({ _id: categoryId }, categoryUpdate, {
                new: true
        }).then(category=>resolve(category)).catch(err=>reject(err))
        })
    },
    getAllCategory:()=>{
        return new Promise((resolve,reject)=>{
            Category.find({}).then(category=>resolve(category)).catch(err=>reject(err))
        })
    }, 
    getSingleCategory:(categoryId)=>{
        return new Promise((resolve,reject)=>{
            Category.findById({_id:categoryId}).then(category=>resolve(category)).catch(err=>reject(err)); 
        })
    }, 
    deleteCategory:(categoryId)=>{
        return new Promise((resolve,reject)=>{
            Category.findByIdAndDelete({_id:categoryId}).then(category=>resolve(category)).catch(err=>reject(err)); 
        })
    }
}


