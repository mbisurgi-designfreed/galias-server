const moment = require('moment');
const twilio = require('twilio');
const config = require('../config/config');
const Info = require('../models/info.model');

module.exports = (io) => {
    const action = {};
    const client = new twilio(config.twilio.accountSid, config.twilio.authToken);
    const recipients = ['+5491161984525', '+5491141759680', '+5491130121862'];

    action.list = async (req, res) => {
        const desde = moment(new Date(req.query.desde)).subtract(3, 'hours');
        const hasta = moment(new Date(req.query.hasta)).subtract(3, 'hours');

        try {
            const info = await Info.find({ fecha: { $gte: desde, $lte: hasta } }).sort({ fecha: -1 });

            res.send(info);
        } catch (err) {
            res.status(400).send(err);
        }
    };

    action.listLast = async (req, res) => {
        try {
            const info = await Info.find().sort({ fecha: -1 }).limit(5);

            res.send(info);
        } catch (err) {
            res.status(400).send(err);
        }
    };

    action.insert = async (req, res) => {
        try {
            const newInfo = await new Info(req.body).save();

            io.sockets.sockets[req.headers.socket].broadcast.emit('newInfo', newInfo);

            const messages = await Promise.all(recipients.map(async (number) => {
                await client.api.messages.create({
                    body: `Info diaria del ${newInfo.fecha} cargada`,
                    from: '+13025250397',
                    to: number
                });
            }));

            res.status(201).send(newInfo);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    };

    return action;
};