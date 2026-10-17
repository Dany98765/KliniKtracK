export function grantPermissionDoctorID({ doctorID }) {
    if (!doctorID) {
        return {
            msg: "Doctor ID field is required!"
        }
    }
    return {
        msg: null
    }
}

export function grantPermissionScope({ permissionScope }) {
    if (!permissionScope) {
        return {
            msg: "Permission scope field is required!"
        }
    }
    return {
        msg: null
    }
}

export function grantPermissionStartAndEndDates({ startDate, endDate }) {
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