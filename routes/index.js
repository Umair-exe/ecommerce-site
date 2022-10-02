const router = require('express').Router();

const Cart = require('../models/Cart');
const Product = require('../models/Product');

/* GET home page. */
router.get('/', async (req, res) => {
  const products = await Product.find();

  if (req.session && req.session.cookie) {
    return res.render('index.ejs', { products, user: true });
  }

  res.render('index.ejs', { products, user: false });
});

router.get('/vendor-shop',(req,res,next) => {
  res.render('shop');
});

router.get('/trade',(req,res,next) => {
  res.render('trade');
});

router.get('/bidding',(req,res,next) => {
  res.render('bidding');
});

router.get('/cart', async (req,res,next) => {
  const cart = await Cart.findOne({userId:123});

  res.render('cart',{cart: cart.length === 0 ? [] : cart});
});

router.get('/checkout',(req,res,next) => {
  res.render('checkout');
});

router.get('/contact',(req,res,next) => {
  res.render('contact');
});

// show the login form
router.get('/login', function (req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

// show the signup form
router.get('/register', function (req, res) {
  res.render('register', { message: req.flash('signupMessage') });
});

module.exports = router;
