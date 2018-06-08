const Talonario = require('../models/talonario.model');

exports.list = async (req, res) => {
    try {
        const talonarios = await Talonario.find({});

        res.send(talonarios);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
}

exports.insert = async (req, res) => {
    try {
        const talonario = await new Talonario(req.body).save();

        res.send(talonario);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};

exports.proximo = async (req, res) => {
    try {
        const talonario = await Talonario.findOne({ habilitado: true });

        res.send(talonario);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
}
