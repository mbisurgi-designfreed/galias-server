const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const SubgrupoController = require('../controllers/subgrupo.controller');

    app.get('/api/subgrupo/list', SubgrupoController.getSubgrupos);
    app.post('/api/subgrupo/new', SubgrupoController.insert);
};