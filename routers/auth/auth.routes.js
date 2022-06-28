const express = require('express');

const { getLoginController, getRegisterController, postLoginController, postRegisterController } = require('../../controllers/auth.controller.js');
const passport = require('../../middlewares/passport.js');

const router = express.Router();

router.get('/register', getRegisterController)

router.post(
    '/register', 
    passport.authenticate('register'),
    postRegisterController
);

router.get('/login', getLoginController);

router.post(
    '/login', 
    passport.authenticate('login', { failureRedirect: '/auth/login' }),
    postLoginController
);


module.exports = router;