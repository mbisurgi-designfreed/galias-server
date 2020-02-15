import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';

import User from '../types/User';

export default class AuthHelpers {
    public static comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    }

    public static async createUser(req) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        const email = req.body.username;

        try {
            let user = await User.findOne({ email });

            if (user) return Promise.reject({ status: 403, message: 'El usuario ya existe' });

            user = await new User({ email, password: hash }).save();

            return user;
        } catch (err) {
            console.log(err);
        }
    }

    public static loginRequired(req, res, next) {
        if (!req.user) return res.status(401).json({ status: 'Por favor inicie sesion' });
        return next();
    }

    public static encodeToken(user) {
        const playload = {
            exp: moment()
                .add(7, 'days')
                .unix(),
            iat: moment().unix(),
            sub: user._id
        };

        return jwt.encode(playload, process.env.TOKEN_SECRET);
    }

    public static decodeToken(token, callback) {
        let payload;
        try {
            payload = jwt.decode(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return callback(err.message);
        }
        return callback(null, payload);
    }

    public static ensureAuthenticated(req, res, next) {
        if (!(req.headers && req.headers.authorization)) {
            return res.status(401).json({
                status: 'Por favor inicie sesion',
                redirect: 'login'
            });
        }

        const header = req.headers.authorization.split(' ');
        const token = header[0];
        AuthHelpers.decodeToken(token, async (err, payload) => {
            if (err) {
                return res.status(401).json({
                    status: err,
                    redirect: 'login'
                });
            } else {
                try {
                    const user = await User.findById(payload.sub);

                    if (!user) {
                        res.status(401).json({
                            status: 'El usuario no existe',
                            redirect: 'login'
                        });

                        return;
                    }

                    req.user = user;
                    next();
                } catch (err) {
                    res.status(500).json({
                        status: `error: ${err}`
                    });
                }
            }
        });
    }

    public static ensureIsUser(req, res, next) {
        const user = req.user;

        if (user.rol === 'admin' || user.rol === 'user') {
            next();
        } else {
            res.status(403).json({
                status: 'El usuario no esta autorizado',
                redirect: 'login'
            });

            return;
        }
    }
}
