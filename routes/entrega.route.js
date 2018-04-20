const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const EntregaController = require('../controllers/entrega.controller');

    // app.get('/api/remito/fecha', RemitoController.list);

    // app.get('/api/remito/today', RemitoController.listToday);

    app.post('/api/entrega/new', EntregaController.insert);
};
