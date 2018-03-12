const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const GrupoController = require('../controllers/grupo.controller');

    app.get('/api/grupo/list', GrupoController.getGrupos);
    app.post('/api/grupo/new', GrupoController.insert);
};