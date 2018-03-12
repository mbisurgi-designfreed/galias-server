const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const InfoController = require('../controllers/info.controller');

    app.get('/api/info/fecha', jwtAuth, InfoController.list);

    app.get('/api/info/last', jwtAuth, InfoController.listLast);

    app.post('/api/info', jwtAuth, InfoController.insert);
};