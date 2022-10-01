var express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
var router = express.Router();

/* GET users listing. */
router.post('/login', async (req,res,next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user) {
      return res.status(401).redirect('/login');
    }
    if(await bcrypt.compareSync(req.body.password,user.password)) {
      const {password ,...others} = user._doc;
      req.session.user = others;
      res.locals.user = req.session.user;
      next();
      return res.redirect('/');
    }
    res.status(401).redirect('/login');
  } catch (error) {
    
  }

})
router.post('/register', async (req,res,next) => {
    try {
      const userExist = await User.findOne({email:req.body.email});
      if (!userExist) {
          const genSalt = bcrypt.genSaltSync(10);
          const hashpass = bcrypt.hashSync(req.body.password, genSalt);
          const user = new User();
          user.name = req.body.fname + req.body.lname;
          user.email = req.body.email;
          user.password = hashpass;

          const newUser =  await user.save();
          if(newUser) {
            res.locals.msg = "user created";
            res.redirect('/login');
          }
      }
      return res.redirect('/register',{
        msg: "user already exist",
      }) 

    } catch (error) {
      res.locals.error = error;
    }

})

module.exports = router;
