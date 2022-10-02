const router = require('express').Router();
const passport = require('passport');

const User = require('../models/User');

// LOGIN ===============================
// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// SIGNUP =================================
// process the signup form
router.post('/register', 
  passport.authenticate('local-register', {
    // successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/register', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
  (req, res, next) => {
    const user = req.user;
    const { fname, lname, address, country, city, zipcode } = req.body;

    User
      .findByIdAndUpdate(user._id, {
        name: fname + lname,
        address,
        country,
        city,
        zipCode: zipcode
      }, function (err, model) {
        if (err) {
          req.flash({ message: err.message });
          return res.redirect('/register');
        }

        return res.redirect('/');
      });
  })
;

// LOGOUT ==============================
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// locally --------------------------------
router.get('/connect/local', function(req, res) {
  res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});

router.post('/connect/local', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/unlink/local', isLoggedIn, function(req, res) {
  var user            = req.user;
  user.email    = undefined;
  user.password = undefined;
  user.save(function(err) {
      res.redirect('/');
  });
});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}

module.exports = router;
