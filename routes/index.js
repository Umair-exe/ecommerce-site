var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const product = [{
    name: 'test',
    price: '21',
    description: 'test'
  }]
  res.render('index.ejs', {product});
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
router.get('/cart',(req,res,next) => {
  res.render('cart');
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
