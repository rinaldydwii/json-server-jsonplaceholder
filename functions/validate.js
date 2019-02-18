function validate(body, validator, method = "PATCH", keyMessage = "") {
    const error = {
        isEmpty: () => false,
        messages: [],
        body: {}
    }
    if (method === "PATCH") {
        const keys = Object.keys(body)
        const length = keys.length
        let i = 0
        do {
            const key = keys[i]
            const keyMessages = `${keyMessage}${keyMessage ? "." : ""}${key}`
            const validatorValue = validator[key]
            const bodyValue = body[key]
            const validatorTypeValue = typeof validatorValue
            const bodyTypeValue = typeof bodyValue
            if (validatorTypeValue === "object" ) {
                if (validatorTypeValue !== bodyTypeValue) {
                    error.messages.push(`${keyMessages} must be an object`)
                    error.isEmpty = () => true
                } else {
                    const errorObject = validate(bodyValue, validatorValue, "POST", keyMessages)
                    error.isEmpty = () => errorObject.isEmpty()
                    error.messages.push(errorObject.messages)
                    if (!error.isEmpty()) {
                        error.body[key] = errorObject.body
                    }
                }
            }
            else if (validatorTypeValue !== "undefined") {
                error.body[key] = bodyValue
            }
            i++
        } while (!error.isEmpty() && i < length)
        // console.log(error)
        return error
    } else if (method === "POST" || method === "PUT") {
        const keys = Object.keys(validator)
        const length = keys.length
        let i = 0
        do {
            const key = keys[i]
            const keyMessages = `${keyMessage}${keyMessage ? "." : ""}${key}`
            const bodyValue = body[key]
            const validatorValue = validator[key]
            const bodyTypeValue = typeof bodyValue
            const validatorTypeValue = typeof validatorValue
            if (validatorTypeValue === "object") {
                if (bodyTypeValue !== validatorTypeValue) {
                    error.messages.push(`${keyMessages} must be an object`)
                    error.isEmpty = () => true
                } else {
                    const errorObject = validate(bodyValue, validatorValue, method, keyMessages)
                    error.isEmpty = () => errorObject.isEmpty()
                    error.messages.push(errorObject.messages)
                }
            }
            else if (bodyTypeValue === "undefined") {
                error.messages.push(`${keyMessages} is required`)
                error.isEmpty = () => true
            }
            else if (bodyTypeValue !== "undefined") {
                error.body[key] = bodyValue
            }
            i++
        } while (!error.isEmpty() && i < length)
        return error
    }
}

module.exports = validate