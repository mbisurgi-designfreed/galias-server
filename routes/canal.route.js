const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const CanalController = require('../controllers/canal.controller');

    app.get('/api/canal/list', CanalController.getCanales);
    app.post('/api/canal/new', CanalController.insert);
};