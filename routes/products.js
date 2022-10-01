const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/',async (req,res,next) => {
    try {
        const products = await Product.find();
        if(products) {
            return res.status(201).json(products);
        }
        return res.status(201).send('no products');
    } catch (error) {
        return res.status(404).json(error)
    }
})

router.get('/:category',async (req,res,next) => {
    try {
        const category = req.params.category ? req.params.category : null;
        if(!category) return res.status(404).json("not products found!");
        const products = await Product.find({category: category});
        if(products) {
            return res.status(201).json(products);
        }
        return res.status(201).send('no products with this category');
    } catch (error) {
        return res.status(404).json(error)
    }
})

router.get('/product/:id',async (req,res,next) => {
    try {
        const id = req.params.id ? req.params.id : null;
        if(!id) return res.status(404).json("not products found!");
        const products = await Product.findById(id);
        if(products) {
            return res.status(201).json(products);
        }
        return res.status(201).send('No product exist');
    } catch (error) {
        return res.status(404).json(error)
    }
})

router.post('/',async (req,res) => {
    try {
        const product = new Product(req.body);
        await product.save()
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.put('update/:id',async (req,res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new: true});
        return res.status(201).json(product); 
    } catch (error) {
        return res.status(400).json(error)
    }
})


module.exports = router;