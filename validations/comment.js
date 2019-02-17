const validate = require('../functions/validate')

function validateComment(body, method) {
    const validator = {
        "postId": true,
        "name": true,
        "email": true,
        "body": true
    }
    return error = validate(body, validator, method)
}

module.exports = validateComment