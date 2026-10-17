export function conditionName({ name }) {
    if (!name) {
        return {
            msg: "Condition name field is required!"
        }
    }
    if (name.length > 30) {
        return {
            msg: "Condition name field cannot exceed 30 characters!"
        }
    }
    return {
        msg: null
    }
}

export function conditionDescription({ description }) {
    if (!description) {
        return {
            msg: "Condition description field is required!"
        }
    }
    if (description.length < 50) {
        return {
            msg: "Condition description field must be at least 50 characters!"
        }
    }
    if (description.length > 150) {
        return {
            msg: "Condition description field cannot exceed 150 characters!"
        }
    }
    return {
        msg: null
    }
}

export function conditionStartAndEndDates({ startDate, endDate }) {
    if (!startDate) {
        return {
            msg: "Start date field is required!"
        }
    }
    if (!endDate) {
        return {
            msg: "End date field is required!"
        }
    }
    if (!(startDate < endDate)) {
        return {
            msg: "End date must be a time after start date!"
        }
    }
    return {
        msg: null
    }
}

export function conditionType({ type }) {
    if (!type) {
        return {
            msg: "Condition type field is required!"
        }
    }
    if (type.length > 30) {
        return {
            msg: "Condition type field cannot exceed 30 characters!"
        }
    }
    return {
        msg: null
    }
}

export function conditionSymptoms({ symptoms }) {
    console.log(symptoms + "ALL SYMPTOMS!")
    if (symptoms.length == 0) {
        return {
            msg: "Condition symptoms field is required!"
        }
    }
    if (symptoms.length > 5) {
        return {
            msg: "Condition symptoms count cannot exceed 5 symptoms!"
        }
    }
    return {
        msg: null
    }
}