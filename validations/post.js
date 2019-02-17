const validate = require('../functions/validate')

function validatePost(body, method) {
    const validator = {
        "userId": true,
        "title": true,
        "body": true,
    }
    return error = validate(body, validator, method)
}

module.exports = validatePost