export const checkValidFullName = (fullName) => {
    if (!fullName) return "Full name is required"
    return null;
}

export const checkValidEmail = (email) => {
    if (!email) return "Email is required"
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) return "Email is not valid";
    return null;
}

export const checkValidPassword = (password) => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters long"
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/[0-9]/.test(password)) return "Password must contain at least one number"
    if (!/[@$!%*?&]/.test(password)) return "Password must contain at least one special character"
    return null;
}
