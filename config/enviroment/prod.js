module.exports = {
    mongo: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN
    },
    pusher: {
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER,
        encrypted: true
    },
    spring: {
        url: process.env.SPRING_URL
    }
}