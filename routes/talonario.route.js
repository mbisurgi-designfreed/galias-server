const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const TalonarioController = require('../controllers/talonario.controller');

    app.post('/api/talonario/new', TalonarioController.insert);
};
