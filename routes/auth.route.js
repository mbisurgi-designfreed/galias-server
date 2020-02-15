const passport = require('passport');
const AuthController = require('../controllers/auth.controller');

const localAuth = passport.authenticate('local', { session: false });

module.exports = (app) => {
    app.post('/signup', AuthController.signup);
    app.post('/signin', localAuth, AuthController.signin);
}
