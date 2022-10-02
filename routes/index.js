var express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const products = await Product.find();
  res.render('index.ejs', {products});
})

router.get('/vendor-shop',(req,res,next) => {
  res.render('shop');
})
router.get('/trade',(req,res,next) => {
  res.render('trade');
})
router.get('/bidding',(req,res,next) => {
  res.render('bidding');
})
router.get('/cart', async (req,res,next) => {
  const cart = await Cart.findOne({userId:123});

  res.render('cart',{cart: cart.length === 0 ? [] : cart});
})
router.get('/checkout',(req,res,next) => {
  res.render('checkout');
})
router.get('/contact',(req,res,next) => {
  res.render('contact');
})
router.get('/login',(req,res,next) => {
  res.render('login')
})
router.get('/register',(req,res,next) => {
  res.render('register');
})

module.exports = router;
