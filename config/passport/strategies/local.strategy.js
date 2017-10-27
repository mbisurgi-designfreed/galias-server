const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user.model');

const options = {
    usernameField: 'email'
}

module.exports = new LocalStrategy(options, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            done(null, false);
        } else {
            user.authenticate(password, (err, isMatch) => {
                if (!isMatch) {
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    } catch (err) {
        done(err);
    }
});