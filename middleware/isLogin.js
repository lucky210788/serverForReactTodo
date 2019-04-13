const fs = require('fs');

function isLogin(req, res, next) {
    let userToken = req.headers['x-apikey'];
    fs.readFile('./database/dbUsers.json', 'utf8', function (err, data) {
        let dataArr = JSON.parse(data);
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].token === userToken) {
                next();
            } else {
                res.status(401).send('the token does not match');
            }
        }
    });
}


module.exports = {isLogin};