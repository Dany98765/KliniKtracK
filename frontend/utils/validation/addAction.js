export function actionName({ name }) {
    if (!name) {
        return {
            msg: "Action name field is required!"
        }
    }
    if (name.length > 30) {
        return {
            msg: "Action name field cannot exceed 30 characters!"
        }
    }
    return {
        msg: null
    }
}

export function actionDescription({ description }) {
    if (!description) {
        return {
            msg: "Action description field is required!"
        }
    }
    if (description.length < 50) {
        return {
            msg: "Action description field must be at least 50 characters!"
        }
    }
    if (description.length > 150) {
        return {
            msg: "Action description field cannot exceed 150 characters!"
        }
    }
    return {
        msg: null
    }
}

export function actionStartAndEndDates({ startDate, endDate }) {
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

export function actionDoctorName({ doctorName }) {
    if (!doctorName) {
        return {
            msg: "Doctor name field is required!"
        }
    }
    return {
        msg: null
    }
}

export function actionTypeValidationFn({ actionType }) {
    if (!actionType) {
        return {
            msg: "Action type field is required!"
        }
    }
    return {
        msg: null
    }
}