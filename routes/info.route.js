const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const InfoController = require('../controllers/info.controller');

    app.get('/api/info/fecha', InfoController.list);

    app.get('/api/info/last', InfoController.listLast);

    app.post('/api/info', InfoController.insert);
};
