function validate(body, validator, method = "PATCH", keyMessage = "") {
    if (method === "PATCH") {
        let newBody = {}
        const keys = Object.keys(body)
        keys.map(key => {
            const value = validator[key]
            const typeValue = typeof value
            if (typeValue === "object") {
                newBody[key] = validate(value[key], value, method)
            }
            else if (typeValue !== "undefined")
                newBody[key] = body[key]
        })
        return newBody
    } else if (method === "POST" || method === "PUT") {
        const error = {
            isEmpty: () => false,
            messages: []
        }
        const keys = Object.keys(validator)
        const length = keys.length
        let i = 0
        do {
            const key = keys[i]
            const keyMessages = `${keyMessage}${keyMessage ? "." : ""}${key}`
            const value = body[key]
            const validatorValue = validator[key]
            const typeValue = typeof value
            const validatorTypeValue = typeof validatorValue
            if (typeValue === validatorTypeValue) {
                const errorObject = validate(value, validator[key], method, keyMessages)
                error.isEmpty = () => errorObject.isEmpty()
                error.messages.push(errorObject.messages)
            }
            else if (typeValue === "undefined") {
                error.messages.push(`${keyMessages} is required`)
                error.isEmpty = () => true
            }
            else if (typeValue === "string" && validatorTypeValue === "object") {
                error.messages.push(`${keyMessages} is object`)
                error.isEmpty = () => true
            }
            i++
        } while (!error.isEmpty() && i < length)
        return error
    }
}

module.exports = validate