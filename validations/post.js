const validate = require('../functions/validate')

// function to validate request for post route
function validatePost(body, method) {
    // initialize post validator
    const validator = {
        "userId": true,
        "title": true,
        "body": true,
    }
    return error = validate(body, validator, method)
}

module.exports = validatePost