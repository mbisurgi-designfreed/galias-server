const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    const ProveedorController = require('../controllers/proveedor.controller');

    app.get('/api/proveedor/list', ProveedorController.list);
    app.get('/api/proveedor/excel', ProveedorController.listExcel);
    app.post('/api/proveedor/new', ProveedorController.insert);
    app.put('/api/proveedor/:id', ProveedorController.update);
};
