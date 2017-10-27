const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('../config/config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email es requerido.'],
        unique: [true, 'Email existente.']
    },
    password: {
        type: String,
        required: [true, 'Contraseña es requerido.']
    }
});

UserSchema.methods.generateJwt = function () {
    const user = this;
    const timestamp = new Date().getTime();

    return jwt.encode({ sub: user.id, iat: timestamp }, config.jwt.secret);
};

UserSchema.methods.authenticate = function (password, done) {
    const user = this;

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return done(err);
        }

        done(null, isMatch);
    });
};

UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return mext(err);
            }

            user.password = hash;

            next();
        });
    });
});

const User = mongoose.model('user', UserSchema, 'users');

module.exports = User;
