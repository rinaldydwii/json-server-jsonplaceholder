const validate = require('../functions/validate')

function validateUser(body, method) {
    const validator = {
        "name": true,
        "username": true,
        "email": true,
        "phone": true,
        "website": true,
        "address": {
            "street": true,
            "suite": true,
            "city": true,
            "zipcode": true,
            "geo": {
                "lat": true,
                "lng": true
            }
        },
        "company": {
            "name": true,
            "catchPhrase": true,
            "bs": true
        }
    }
    return validate(body, validator, method)
}

module.exports = validateUser