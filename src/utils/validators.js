//Check email formatting
exports.isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

//Check password formatting
exports.validatePassword = (password) => {
    const errors = [];

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number.");
    }

    // Check if the password contains at least one  letter
    if (!/[A-Za-z]/.test(password)) {
        errors.push("Password must contain at least one letter.");
    }

    return errors;
};
