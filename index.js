const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');
const config = require('./config/config');

const app = express();

mongoose.connect(config.mongo.url, { useMongoClient: true });

require('./config/passport/passport');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Client connected with id: ', socket.client.id);
});

require('./routes/auth.route')(app);
require('./routes/cliente.route')(app);
require('./routes/articulo.route')(app);
require('./routes/info.route')(app, io);
require('./routes/pedido.route')(app, io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});

module.exports = server;