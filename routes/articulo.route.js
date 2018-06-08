const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const ArticuloController = require('../controllers/articulo.controller');

    app.get('/api/articulo/list', ArticuloController.list);
    app.post('/api/articulo/new', ArticuloController.insert);
    app.put('/api/articulo/:id', ArticuloController.update);
    app.put('/api/articulo/edit/precios', ArticuloController.precios);

    app.get('/api/articulo/pendiente', ArticuloController.pendiente);
};
