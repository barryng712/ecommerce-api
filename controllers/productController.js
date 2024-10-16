const mongoose = require('mongoose');
const Product = require('../models/productModel');

const getProducts = async(req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// Controller to get a product by its ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
      
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
  
        res.json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async(req, res)=>{
    const {name, description, price, image} = req.body;
    try{
        const product = new Product({name, description, price, image});
        const createProduct = await product.save();
        res.status(201).json(createProduct);
    }catch(error){
        console.error('error creating product:', error);
        res.status(500).json({message: error.message})
    }
}
module.exports = {getProducts, getProductById, createProduct};