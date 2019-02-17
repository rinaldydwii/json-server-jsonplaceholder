const validate = require('../functions/validate')

// function to validate request for todo route
function validateTodo(body, method) {
    // initialize todo validator
    const validator = {
        "userId": true,
        "title": true,
        "completed": true,
    }
    return error = validate(body, validator, method)
}

module.exports = validateTodo