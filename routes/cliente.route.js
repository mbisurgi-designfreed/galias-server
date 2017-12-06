const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const ClienteController = require('../controllers/cliente.controller');

    app.get('/api/cliente/:id', ClienteController.getById);
    app.post('/api/cliente/new', ClienteController.insert);
};
