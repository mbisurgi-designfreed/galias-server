const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app, io) => {
    const PedidoController = require('../controllers/pedido.controller')(io);

    app.get('/api/pedido/list', PedidoController.list);
        
    app.post('/api/pedido/new', PedidoController.insert);
};
