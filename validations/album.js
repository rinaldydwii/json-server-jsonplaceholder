const validate = require('../functions/validate')

function validateAlbum(body, method) {
    const validator = {
        "userId": true,
        "title": true,
    }
    return error = validate(body, validator, method)
}

module.exports = validateAlbum