module.exports = {
    mongo: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN'
    }
}