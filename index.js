const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

const app = express();

mongoose.connect(config.mongo.url, { useMongoClient: true });


require('./config/passport/passport');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/auth.route')(app);
require('./routes/info.route')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});