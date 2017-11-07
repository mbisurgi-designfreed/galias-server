if (process.env.NODE_ENV === 'production') {
    module.exports = require('./enviroment/prod');
} else {
    module.exports = require('./enviroment/dev');
}
