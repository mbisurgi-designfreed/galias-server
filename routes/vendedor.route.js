const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const VendedorController = require('../controllers/vendedor.controller');

    app.get('/api/vendedor/list', VendedorController.getVendedores);
    app.post('/api/vendedor/new', VendedorController.insert);
};
