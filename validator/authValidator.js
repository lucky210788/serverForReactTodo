const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const registrationSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "surname": {
            "type": "string"
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "phone": {
            "type": "string"
        },
        "password": {
            "type": "string",
            "minLength": 9
        },
    },
    required: ['name', 'surname', 'email', 'phone', 'password']
};

const loginSchema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 9
        },
    },
    required: ['email', 'password']
};

function registrationSchemaValidator(req, res, next) {
    let valid = ajv.validate(registrationSchema, req.body);
    if (!valid) {
        res.status(400).send({ error: ajv.errors });
    } else {
        next()
    }
}

function loginSchemaValidator(req, res, next) {
    let valid = ajv.validate(loginSchema, req.body);
    if (!valid) {
        res.status(400).send({ error: ajv.errors });
    } else {
        next()
    }
}

module.exports = {registrationSchemaValidator, loginSchemaValidator};