const validate = require('../functions/validate')

// function to validate request for album route
function validateAlbum(body, method) {
    // initialize album validator
    const validator = {
        "userId": true,
        "title": true,
    }
    return error = validate(body, validator, method)
}

module.exports = validateAlbum