const Talonario = require('../models/talonario.model');

exports.insert = async (req, res) => {
    try {
        const talonario = await new Talonario(req.body).save();

        res.send(talonario);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};
