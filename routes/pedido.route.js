const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const PedidoController = require('../controllers/pedido.controller');

    app.get('/api/pedido/fecha', PedidoController.list);

    app.get('/api/pedido/today', PedidoController.listToday);
        
    app.get('/api/pedido/pendiente/:cliente', PedidoController.pendienteCliente);

    app.post('/api/pedido/new', PedidoController.insert);
};
