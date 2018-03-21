const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const FamiliaController = require('../controllers/familia.controller');

    app.get('/api/familia/list', FamiliaController.getFamilia);
    app.post('/api/familia/new', FamiliaController.insert);
};