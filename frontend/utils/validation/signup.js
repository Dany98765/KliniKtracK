export function validateName({ name }) {
    name = name.trim()
    if (!name) {
        return {
            msg: "Name is required!"
        };
    }
    if (!(name.includes(" "))) {
        return {
            msg: "Name must be full!"
        };
    }
    return { msg: null };
}
export function validateEmail({ email }) {
    email = email.trim()
    if (email.length == 0) {
        return {
            msg: "Email is required!"
        };
    }
    if (!email.includes("@")) {
        return {
            msg: "The '@' symbol is required to be present in your email address!"
        };
    }
    if (!(email.includes(".com"))) {
        return {
            msg: "The '.com' domain is required to be present in your email address!"
        };
    }

    return { msg: null };
}
export function validatePassword({ password }) {
    password = password.trim()
    if (password.length === 0)
        return {
            msg: "The password is required!"
    };
    if (password.length < 8)
        return {
            msg: "Password must be at least 8 characters long in length!"
    };
    if (!/[^a-zA-Z0-9]/.test(password))
        return {
            msg: "Password must contain at least 1 special character!"
    };
    if (!/[0-9]/.test(password))
        return {
            msg: "Password must be at least 1 number!"
    }
    return { success: null };
}

export function validatePasswordConfirmation({ password, confirmPassword }){
    password = password.trim()
    confirmPassword = confirmPassword.trim()
    if (!confirmPassword) {
        return {
            msg: "Confirm password field is required!"
        }
    }
    if (password !== confirmPassword) {
        return {
            msg: "Passwords do not match across 2 entries!"
        }
    }

    return {
        msg: null
    }
}