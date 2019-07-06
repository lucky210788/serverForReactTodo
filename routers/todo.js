const express = require('express');
const router = express.Router();
const fs = require('fs');
const { requestSchemaValidator } = require('../validator/requestValidator');
const { isLogin } = require('../middleware/isLogin');

router.post('/api/todolist',isLogin, requestSchemaValidator,  function (req, res) {
    fs.readFile('./database/dbtodo.json', 'utf8', function (err, data) {
        let dataArr = JSON.parse(data);
        const uuidv4 = require('uuid/v4');
        let newTodo = {
            _id: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            status: false,
            selected: false
        };
        dataArr.unshift(newTodo);
        fs.writeFile('./database/dbtodo.json', JSON.stringify(dataArr), function (err, data) {
            res.status(201).send(dataArr);
        });
    });
});

router.get('/api/todolist', isLogin, function (req, res) {
    fs.readFile('./database/dbtodo.json', 'utf8', function (err, data) {
        res.status(201).send(JSON.parse(data));
    });
});

router.put('/api/todolist/:id', isLogin, requestSchemaValidator, function (req, res) {
    fs.readFile('./database/dbtodo.json', 'utf8', function (err, data) {
        let dataArr = JSON.parse(data);
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i]._id === req.params.id) {
                dataArr[i][req.body.propName] = req.body.status;
            }
        }
        fs.writeFile('./database/dbtodo.json', JSON.stringify(dataArr), function (err, data) {
            res.status(201).send({});
        });
    });
});

router.delete('/api/todolist/:id', isLogin, function (req, res) {
    fs.readFile('./database/dbtodo.json', 'utf8', function (err, data) {
        let dataArr = JSON.parse(data);
        dataArr = dataArr.filter(task => task._id !== req.params.id);
        fs.writeFile('./database/dbtodo.json', JSON.stringify(dataArr), function (err, data) {
            res.status(201).send({});
        });
    });
});

module.exports = router;