const fileUpload = require('express-fileupload');

module.exports = (app) => {
    const FilesController = require('../controllers/files.controller');

    app.post('/api/files/ventas', fileUpload(), FilesController.uploadVentas);
};
