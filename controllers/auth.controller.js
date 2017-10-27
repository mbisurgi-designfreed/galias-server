const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = await new User({ email, password }).save();

            user.generateJwt();

            return res.send({ token: user.generateJwt() });
        }

        res.status(422).send({ err: 'Email existente.' });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.signin = (req, res, next) => {
    const { user } = req;

    res.send({ token: user.generateJwt() });
};
