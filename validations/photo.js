const validate = require('../functions/validate')

function validatePhoto(body, method) {
    const validator = {
        "albumId": true,
        "title": true,
        "url": true,
        "thumbnailUrl": true
    }
    return error = validate(body, validator, method)
}

module.exports = validatePhoto