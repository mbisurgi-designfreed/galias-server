const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const RemitoController = require('../controllers/remito.controller');

    app.get('/api/remito/fecha', RemitoController.list);

    app.get('/api/remito/today', RemitoController.listToday);

    app.post('/api/remito/new', RemitoController.insert);
    
    app.post('/api/remito/sync', RemitoController.sync);

    app.post('/api/remito/syncAll', RemitoController.syncAll);
};
