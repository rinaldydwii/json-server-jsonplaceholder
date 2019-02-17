const validate = require('../functions/validate')

function validateTodo(body, method) {
    const validator = {
        "userId": true,
        "title": true,
        "completed": true,
    }
    return error = validate(body, validator, method)
}

module.exports = validateTodo