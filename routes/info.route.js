const passport = require('passport');
const InfoController = require('../controllers/info.controller');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    app.get('/api/info', jwtAuth, InfoController.list);

    app.get('/api/info/last', jwtAuth, InfoController.listLast);

    app.post('/api/info', jwtAuth, InfoController.insert);
};