import express from 'express';
import log4js from 'log4js';

import { register, login } from '../../../controllers/auth.controller.js';
import passport from '../../../middlewares/passport.js';

const router = express.Router();

router.get('/register', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const name = req.session?.name
    if (name) {
        res.redirect('/')
    } else {
        return res.render('main', { body: '../pages/register', data: { name }});
    }
})

router.post(
    '/register', 
    passport.authenticate('register'), 
    register
);

router.get('/login', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    // if (req.isAuthenticated()) {
    //     res.redirect('/');
    // }
    const name = req.session?.name
    if (name) {
        res.redirect('/');
    } else {
        console.log('render login');
        return res.render('main', { body: '../pages/login', data: { name }});
    }
})


router.post(
    '/login', 
    passport.authenticate('login', { successRedirect: '/', failureRedirect: '/auth/login' }),
    login
);


export default router;