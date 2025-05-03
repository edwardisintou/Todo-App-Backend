// @desc    Register user
// @route   POST /api/users
// access   Public
const registerUser = (req, res, next) => {
    res.json("Register User");
};

// @desc    Login
// @route   POST /api/users/login
// access   Public
const loginUser = (req, res, next) => {
    res.json("Login User");
};

// @desc    Get user data display
// @route   GET /api/users/me
// access   Private
const getMe = (req, res, next) => {
    res.json("User data display");
};

export { registerUser, loginUser, getMe };
