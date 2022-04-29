import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import UsersDao from '../models/daos/Users.dao.js';

const LocalStrategy = passportLocal.Strategy;
const User = new UsersDao();

const isValidPassword = (email, password) => bcrypt.compareSync(password, createHash(password), email.password);
const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
    User.getById(id)
    .then(user => done(null, user));
});

passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        User.getByEmail(email)
        .then((user) => {
            if (!isValidPassword(email, password)) {
                return done(null, false, { data: { error: 'Invalid password' }});
            }
            return done(null, user);
        })
        .catch((error) => {
            return done(error);
        })
    }
));

passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    (req, email, password, done) => {
        const newUser = {
            email,
            password: createHash(password),
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            intPrefix: req.body.intPrefix,
            phone: req.body.phone,
            avatar: `${req.body.name.replace(' ', '-')}-${req.body.phone}.png`
        }

        User.createUser(newUser)
        .then((user) => {
            console.log('Registration succesful');
            return done(null, user);
        })
        .catch((error) => {
            console.log('Error signing up', error);
            return done(error);
        })
    }
));

export default passport;