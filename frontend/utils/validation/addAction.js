export function actionName(name) {
    if (!name) {
        return {
            msg: "Action name field is required!"
        }
    } if (name > 30) {
        return {
            msg: "Action name field cannot exceed 30 characters!"
        }
    }
}