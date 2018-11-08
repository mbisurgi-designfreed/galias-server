const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const PedidoController = require('../controllers/pedido.controller');

    app.get('/api/pedido/fecha', PedidoController.list);

    app.get('/api/pedido/today', PedidoController.listToday);
        
    app.get('/api/pedido/pendiente/:cliente', PedidoController.pendienteCliente);

    app.post('/api/pedido/new', jwtAuth, PedidoController.insert);
    
    app.post('/api/pedido/editar', PedidoController.editar);

    app.post('/api/pedido/anular', PedidoController.anular);

    app.post('/api/pedido/anularAll', PedidoController.anularAll);

    app.post('/api/pedido/item/eliminar', PedidoController.eliminarItem);
};
