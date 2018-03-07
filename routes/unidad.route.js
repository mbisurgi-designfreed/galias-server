const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const UnidadController = require('../controllers/unidad.controller');

    app.post('/api/unidad/new', UnidadController.insert);
};