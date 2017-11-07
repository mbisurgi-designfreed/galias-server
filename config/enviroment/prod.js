module.exports = {
    mongo: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}