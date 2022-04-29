import express from 'express';
import log4js from 'log4js';
import multer from 'multer';

import { register, login } from '../../../controllers/auth.controller.js';
import passport from '../../../middlewares/passport.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/avatars')
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.name.replace(' ', '-')}-${req.body.phone}.png`);
    },
})

const upload = multer({ storage })

const router = express.Router();

router.get('/register', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    
    return res.render('main', { body: '../pages/register' });
})

router.post(
    '/register', 
    upload.single('avatar'),
    passport.authenticate('register', { failureRedirect: '/auth/register' }),
    register
);

router.get('/login', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
  
    consoleLogger.info(`Session not found, redirect to ${req.originalUrl}.`);
    return res.render('main', { body: '../pages/login' });
})


router.post(
    '/login', 
    passport.authenticate('login', { failureRedirect: '/auth/login' }),
    login
);


export default router;