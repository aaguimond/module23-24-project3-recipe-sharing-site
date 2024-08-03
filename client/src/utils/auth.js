// Save token to user's local storage
export const saveToken = (token) => {
    localStorage.setItem('token', token)
};

// Get token from user's local storage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Check if a user is logged in by looking for their token. The double exclamation mark converts the
// result of the token gathering to a boolean, returning a value of true or false based on whether the
// user has a token or doesn't have a token respectively
export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

// Logout user by removing the token
export const logout = () => {
    localStorage.removeItem('token');
};