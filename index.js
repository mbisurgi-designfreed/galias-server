const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

const app = express();

mongoose.connect(config.mongo.url, { useMongoClient: true });
mongoose.Promise = Promise;

require('./config/passport/passport');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/auth.route')(app);
require('./routes/unidad.route')(app);
require('./routes/canal.route')(app);
require('./routes/subcanal.route')(app);
require('./routes/familia.route')(app);
require('./routes/grupo.route')(app);
require('./routes/subgrupo.route')(app);
require('./routes/cliente.route')(app);
require('./routes/articulo.route')(app);
require('./routes/info.route')(app);
require('./routes/pedido.route')(app);
require('./routes/remito.route')(app);
require('./routes/entrega.route')(app);
require('./routes/talonario.route')(app);
require('./routes/location.route')(app);

require('./jobs/sync')();

app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).send(err.message);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});

module.exports = app;