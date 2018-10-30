const Geolocation = require('../models/geolocation.model');

module.exports = (app) => {
    app.post('/api/locations', async (req, res, next) => {
        try {
            console.log(req.body);

            await new Geolocation(req.body).save();

            res.send('Ok');
        } catch (err) {
            console.log(err);
            res.send('Error');
        }
    })
};