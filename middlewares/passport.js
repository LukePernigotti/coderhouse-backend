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
    (email, password, done) => {
        User.getByEmail(email)
        .then((user) => {
            if (!isValidPassword(email, password)) {
                return done(null, false, { data: { error: 'Invalid password' }});
            }
            return done(null, user);
            // if (!user) {
            //     console.log(`User with email ${email} not found`);
            //     return done(null, false);
            // }
        })
        .catch((error) => {
            return done(error);
        })
    }
));

passport.use('register', new LocalStrategy(
    { passReqToCallback: true },
    (req, email, password, done) => {
        const newUser = {
            email,
            password: createHash(password),
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
    )
);

export default passport;