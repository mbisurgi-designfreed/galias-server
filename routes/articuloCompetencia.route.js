const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const ArticuloCompetenciaController = require('../controllers/articuloCompetencia.controller');

    app.get('/api/articulo-competencia/list', ArticuloCompetenciaController.list);
    app.get('/api/articulo-competencia/excel', ArticuloCompetenciaController.listExcel);
    app.post('/api/articulo-competencia/new', ArticuloCompetenciaController.insert);
    app.put('/api/articulo-competencia/:id', ArticuloCompetenciaController.update);
};
