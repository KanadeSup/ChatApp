

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
            .match(/^[a-zA-Z0-9]{5,12}$/)
    );
}

export function ValidatePassword(inputText) {
    return (
        String(inputText)
            .toLowerCase()
            .match(/^[a-zA-Z0-9!@#$%^&*]{6,20}$/)
    );
}
