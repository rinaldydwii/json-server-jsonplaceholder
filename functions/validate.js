function validate(body, validator, method = "PATCH", keyMessage = "") {
    // define default error const
    const error = {
        isEmpty: () => false,
        messages: [],
        body: {}
    }
    // define object keys
    let objectKeys = null
    if (method === "PATCH")
        objectKeys = body
    else if (method === "POST" || method === "PUT") 
        objectKeys = validator
    // define keys
    const keys = Object.keys(objectKeys)
    // define length keys
    const length = keys.length
    let i = 0
    do {
        // define key
        const key = keys[i]
        // define key messages 
        const keyMessages = `${keyMessage}${keyMessage ? "." : ""}${key}`
        // define validator value & validator type value
        const validatorValue = validator[key]
        const validatorTypeValue = typeof validatorValue
        // define body value & body type value
        const bodyValue = body[key]
        const bodyTypeValue = typeof bodyValue
        // check if validator is object
        if (validatorTypeValue === "object") {
            // check if body types is not equal with validator
            if (bodyTypeValue !== validatorTypeValue) {
                // assing error must be object
                error.messages.push(`${keyMessages} must be an object`)
                error.isEmpty = () => true
            } else {
                // define error object
                let errorObject = null
                if (method === "PATCH") {
                    // recursive validate for patch method
                    errorObject = validate(bodyValue, validatorValue, "POST", keyMessages)
                }
                else if (method === "POST" || method === "PUT") {
                    // recursive validate for post or put method
                    errorObject = validate(bodyValue, validatorValue, method, keyMessages)
                }
                // assign error
                error.isEmpty = () => errorObject.isEmpty()
                error.messages.push(errorObject.messages)
                if (method === "PATCH")
                    // assign body if error isEmpty is false
                    if (!error.isEmpty()) {
                        error.body[key] = errorObject.body
                    }
            }
        }
        // check if validator other than objects
        else {
            if (method === "PATCH") {
                // check if validator is not undefined
                if (validatorTypeValue !== "undefined") {
                    // assign body value to body
                    error.body[key] = bodyValue
                }
            } else if (method === "POST" || method === "PUT") {
                // check if body value is undefined
                if (bodyTypeValue === "undefined") {
                    // assign error is required
                    error.messages.push(`${keyMessages} is required`)
                    error.isEmpty = () => true
                }
                // check if body is not undefined
                else if (bodyTypeValue !== "undefined") {
                    // assign body value to body
                    error.body[key] = bodyValue
                }
            }
        }
        // increment
        i++
    } while (!error.isEmpty() && i < length) // stop is isEmpty is true and i less than length
    // return error
    return error
}

module.exports = validate