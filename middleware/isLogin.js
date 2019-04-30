const fs = require('fs');

function isLogin(req, res, next) {
    let userToken = req.headers['x-apikey'];
    if(userToken){
        fs.readFile('./database/dbUsers.json', 'utf8', function (err, data) {
            let dataArr = JSON.parse(data);
            let result = dataArr.find(function(n) {
                if(n.token === userToken){
                    return true
                }
            });
            if (result){
                next();
            } else {
                res.status(401).send('the token does not match');
            }
        });
    } else {
        res.status(401).send('the token does not match');
    }
}

module.exports = {isLogin};