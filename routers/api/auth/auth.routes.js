import express from 'express';
import multer from 'multer';

import { getLoginController, getRegisterController, postLoginController, postRegisterController } from '../../../controllers/auth.controller.js';
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

router.get('/register', getRegisterController)

router.post(
    '/register', 
    upload.single('avatar'),
    passport.authenticate('register', { failureRedirect: '/auth/register' }),
    postRegisterController
);

router.get('/login', getLoginController);

router.post(
    '/login', 
    passport.authenticate('login', { failureRedirect: '/auth/login' }),
    postLoginController
);


export default router;