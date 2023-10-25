
const categoryServices = require('../services/categoryService')

module.exports = {
    createCategory:async (req,res,next)=>{
        try {
            const category = await categoryServices.createCategory(req.body); 
            res.status(201).json(category); 
        } catch (error) {
            next(error)
        }
    },
    getAllCategory:async(req,res,next)=>{
        try {
           const categorys = await categoryServices.getAllCategory(); 
           res.status(200).json(categorys); 
        } catch (error) {
           res.status(500).json(error);  
        }
    },
    getSingleCategory:async(req,res,next)=>{
        try {
            const category = await categoryServices.getSingleCategory(req.params.id); 
            res.status(200).json(category)
        } catch (error) {
           res.status(500).json(error); 
        }
    },
    deleteCategory:async(req,res,next)=>{
        try {
            await categoryServices.deleteCategory(req.params.id); 
            res.status(200).json('delete Category success !'); 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCategory:async(req,res,next)=>{
        try {
            await categoryServices.updateCategory({categoryId:req.params.id,categoryUpdate:req.body}); 
            res.status(200).json('delete Category success !'); 
        } catch (error) {
            res.status(500).json(error);
        }
    }
}