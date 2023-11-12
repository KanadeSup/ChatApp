

export function ValidateEmail(inputText) {
    return String(inputText)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function ValidateUsername(inputText) {
    return (
        String(inputText)
            .toLowerCase()
            .match(/^[a-zA-Z0-9]+$/) && inputText.length >= 5
    );
}

export function ValidatePassword(inputText) {
    return (
        String(inputText)
            .toLowerCase()
            .match(/^[a-zA-Z0-9]+$/) && inputText.length >= 6
    );
}

export function ValidateSubmit(errorSyntax) {
    return (
        Object.keys(errorSyntax).length === 4 &&
        errorSyntax.email === null &&
        errorSyntax.username === null &&
        errorSyntax.password === null &&
        errorSyntax.repassword === null
    );
}
