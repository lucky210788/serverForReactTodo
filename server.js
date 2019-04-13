const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoList = require('./routers/todo');
const userList = require('./routers/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', todoList);
app.use('/', userList);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});