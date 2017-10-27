const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/galias', { useMongoClient: true });

require('./config/passport/passport');

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/auth.route')(app);
require('./routes/info.route')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});