if (process.env.NODE_ENV === 'production') {
    module.exports = require('./enviroment/prod');
} else if (process.env.NODE_ENV === 'test') {
    module.exports = require('./enviroment/testing');
} else {
    module.exports = require('./enviroment/dev');
}
