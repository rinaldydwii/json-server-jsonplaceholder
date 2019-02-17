const validate = require('../functions/validate')

// function to validate request for comment route
function validateComment(body, method) {
    // initialize comment validator
    const validator = {
        "postId": true,
        "name": true,
        "email": true,
        "body": true
    }
    return error = validate(body, validator, method)
}

module.exports = validateComment