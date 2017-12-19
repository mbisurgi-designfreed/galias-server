const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const ClienteController = require('../controllers/cliente.controller');

    app.get('/api/cliente/id/:id', ClienteController.getById);
    app.get('/api/cliente/codigo/:codigo', ClienteController.getByCodigo);
    app.get('/api/cliente/list', ClienteController.getClientes);
    app.post('/api/cliente/new', ClienteController.insert);
};
