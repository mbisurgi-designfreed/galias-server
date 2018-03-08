const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const UnidadController = require('../controllers/unidad.controller');

    app.get('/api/unidad/list', UnidadController.list);
    app.post('/api/unidad/new', UnidadController.insert);
};