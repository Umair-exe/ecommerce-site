const { json } = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

router.get('/getItems/',async (req,res,next) =>{ 
    try {
        const user = req.user;
        const cartItems = await Cart.find();
        res.status(201).json(cartItems);
    } catch (error) {
        next(error);
    }
})

router.get('/addItems/:id', async (req,res,next) => {
    try {
        const  id = req.params.id;
        const checkProduct = await Cart.findOne({userId:123});
        console.log(checkProduct)
        let index = checkProduct !== null ? checkProduct.products.findIndex(e => e._id == id) : -1 ;
        if (index !== -1) {
            checkProduct.products[index].quantity = checkProduct.products[index].quantity + 1;
            const result = await checkProduct.save();
            if(result) {
                const products = await Cart.find();
                return res.redirect('/cart');
            }
        }
        else {
            const product = await Product.findById(id);
            const cartItem = new Cart();
            cartItem.userId = 123;
            cartItem.products.push(product);
            await cartItem.save();
            res.redirect('/cart');
        }
    } catch (error) {
        return res.status(403).json(error.message);
    }
})

router.delete('/delteItem/:productId', async (req,res,next) => {
    try {
        const deletedItem = await Cart.updateOne({userId: 123}, {
            $pull: {
                'products.$._id': req.params.productId,
            }
        })
        res.redirect('/cart');
    } catch (error) {
        next(error)
    }
})

router.put('/increment/:productId',async(req,res) => {
    try {
        const updateItem = await Cart.find();
        updateItem.find(product => product.id === req.params.productId);
    } catch (error) {
        return res.status(403).send(error);
    }
})
module.exports = router;