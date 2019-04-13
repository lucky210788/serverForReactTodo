const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const requestSchema = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "status": {
            "type": "string"
        },
        "selected": {
            "type": "boolean"
        }
    }
};

function requestSchemaValidator(req, res, next) {
    let valid = ajv.validate(requestSchema, req.body);
    if (!valid) {
        res.status(400).send({ error: ajv.errors });
    } else {
        next()
    }
}

module.exports = {requestSchemaValidator};