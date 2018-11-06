const axios = require('axios');

const config = require('../config/config');
const Comprobante = require('../models/comprobante.model');

const getComprobantes = async function () {
    // setInterval(async () => {
    //     try {
    //         const req = await axios.get(`${config.spring.url}/comprobante/list`);

    //         console.log(req.data);

    //         await Comprobante.insertMany(req.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, 1000);
};

module.exports = getComprobantes;