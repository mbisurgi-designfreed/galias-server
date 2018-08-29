const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const TalonarioController = require('../controllers/talonario.controller');

    app.get('/api/talonario/list', TalonarioController.list);

    app.get('/api/talonario/list/:tipo', TalonarioController.listByTipo);

    app.post('/api/talonario/new', TalonarioController.insert);
    
    app.get('/api/talonario/proximo', TalonarioController.proximo);
};
