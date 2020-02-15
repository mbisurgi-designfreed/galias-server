const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user.model');

const options = {
    usernameField: 'username'
}

module.exports = new LocalStrategy(options, async (username, password, done) => {
    try {
        const user = await User.findOne({ email: username });

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
        console.log('err', err);
        done(err);
    }
});
