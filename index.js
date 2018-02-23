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
require('./routes/canal.route')(app);
require('./routes/subcanal.route')(app);
require('./routes/cliente.route')(app);
require('./routes/articulo.route')(app);
require('./routes/info.route')(app, io);
require('./routes/pedido.route')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});

module.exports = app;