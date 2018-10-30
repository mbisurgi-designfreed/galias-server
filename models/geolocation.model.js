const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GeolocationSchema = new Schema({
    location: {
        type: Object
    }
});

const Geolocation = mongoose.model('geolocation', GeolocationSchema, 'geolocations');

module.exports = Geolocation;