module.exports = (app) => {
    app.post('/api/locations', async (req, res, next) => {
        console.log(req.body);
        res.send('Ok');
    })
};