const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const CompetenciaController = require('../controllers/competencia.controller');

    app.get('/api/competencia/list', CompetenciaController.list);
    app.get('/api/competencia/excel', CompetenciaController.listExcel);
    app.post('/api/competencia/new', CompetenciaController.insert);
    app.put('/api/competencia/:id', CompetenciaController.update);
};
