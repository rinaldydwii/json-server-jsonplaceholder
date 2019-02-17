const validate = require('../functions/validate')

// function to validate request for photo route
function validatePhoto(body, method) {
    // initialize photo validator
    const validator = {
        "albumId": true,
        "title": true,
        "url": true,
        "thumbnailUrl": true
    }
    return error = validate(body, validator, method)
}

module.exports = validatePhoto