const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const SubcanalController = require('../controllers/subcanal.controller');

    app.get('/api/subcanal/list', SubcanalController.getSubcanales);
    app.post('/api/subcanal/new', SubcanalController.insert);
};