const moment = require('moment');
const twilio = require('twilio');
const config = require('../config/config');
const pusher = require('../config/pusher/pusher');
const Info = require('../models/info.model');

const client = new twilio(config.twilio.accountSid, config.twilio.authToken);
const recipients = ['+5491161984525', '+5491141759680', '+5491130121862'];

exports.list = async (req, res) => {
    const desde = req.query.desde;
    const hasta = req.query.hasta;

    try {
        const info = await Info.find({ fecha: { $gte: desde, $lte: hasta } }).sort({ fecha: -1 });

        res.send(info);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.listLast = async (req, res) => {
    try {
        const info = await Info.find().sort({ fecha: -1 }).limit(5);

        res.send(info);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.insert = async (req, res) => {
    try {
        const newInfo = await new Info(req.body).save();

        const messages = await Promise.all(recipients.map(async (number) => {
            await client.api.messages.create({
                body: `Info diaria del ${newInfo.fecha} cargada. https://galias-app.herokuapp.com/`,
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

// module.exports = () => {
//     const action = {};
//     const client = new twilio(config.twilio.accountSid, config.twilio.authToken);
//     const recipients = ['+5491161984525', '+5491141759680', '+5491130121862'];

//     action.list = async (req, res) => {
//         // const desde = moment(new Date(req.query.desde)).subtract(3, 'hours');
//         // const hasta = moment(new Date(req.query.hasta)).subtract(3, 'hours');

//         pusher.trigger('info', 'hello', { message: 'Hello World...from Pusher...info list' });

//         const desde = req.query.desde;
//         const hasta = req.query.hasta;

//         try {
//             const info = await Info.find({ fecha: { $gte: desde, $lte: hasta } }).sort({ fecha: -1 });

//             res.send(info);
//         } catch (err) {
//             res.status(400).send(err);
//         }
//     };

//     action.listLast = async (req, res) => {
//         pusher.trigger('info', 'hello', { message: 'Hello World...from Pusher...info list last 5' });

//         try {
//             const info = await Info.find().sort({ fecha: -1 }).limit(5);

//             res.send(info);
//         } catch (err) {
//             res.status(400).send(err);
//         }
//     };

//     action.insert = async (req, res) => {
//         try {
//             const newInfo = await new Info(req.body).save();

//             // io.sockets.sockets[req.headers.socket].broadcast.emit('newInfo', newInfo);

//             const messages = await Promise.all(recipients.map(async (number) => {
//                 await client.api.messages.create({
//                     body: `Info diaria del ${newInfo.fecha} cargada. https://galias-app.herokuapp.com/`,
//                     from: '+13025250397',
//                     to: number
//                 });
//             }));

//             res.status(201).send(newInfo);
//         } catch (err) {
//             console.log(err);
//             res.status(400).send(err);
//         }
//     };

//     return action;
// };