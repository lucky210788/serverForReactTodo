const express = require('express');
const router = express.Router();
const fs = require('fs');
const { registrationSchemaValidator, loginSchemaValidator } = require('../validator/authValidator');


router.post('/api/registration', registrationSchemaValidator, function (req, res, next) {
    fs.readFile('./database/dbUsers.json', 'utf8', function (err, data) {
        if(err){
            return next(err);
        } else {
            let usersArr = JSON.parse(data);
            const token = require('uuid/v4');
            let newUser = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                token: token()
            };
            usersArr.push(newUser);
            fs.writeFile('./database/dbUsers.json', JSON.stringify(usersArr), function (err, data) {
                if(err){
                    return next(err);
                } else {
                    res.status(201).send({});
                }
            });
        }
    });
});

router.post('/api/login', loginSchemaValidator, function (req, res, next) {
    fs.readFile('./database/dbUsers.json', 'utf8', function (err, data) {
        if(err){
            return next(err);
        }else{
            let usersArr = JSON.parse(data);
            let user =[];

            for(let i = 0; i<usersArr.length; i++){
                if(usersArr[i].email === req.body.email && usersArr[i].password === req.body.password){
                    user.push(usersArr[i])
                }
            }

            if (user.length > 0) {
                res.status(201).send({'token': user[0].token});
            }else{
                res.status(500);
                return next(err);
            }
        }
    });
});

module.exports = router;