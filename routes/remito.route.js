const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const RemitoController = require('../controllers/remito.controller');

    app.get('/api/remito/fecha', RemitoController.list);

    app.post('/api/remito/new', RemitoController.insert);
};
