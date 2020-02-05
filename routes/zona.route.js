const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const ZonaController = require('../controllers/zona.controller');

    app.get('/api/zona/list', ZonaController.getZonas);
    app.post('/api/zona/new', ZonaController.insert);
};
