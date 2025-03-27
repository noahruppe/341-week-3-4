const validator = require('../helpers/validate');

// User validation middleware
const saveUser = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "password": "required|string|min:6",
        "email": "required|string|email"
    };

    try {
        // Validate request body using validator
        const isValid = await validator(req.body, validationRule);
        
        // If validation fails, respond with an error
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed for user data' });
        }
        
        // If validation passes, continue to next middleware
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Server error during user validation',
            error: err.message
        });
    }
};

// Task validation middleware
const saveTask = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "description": "required|string",
        "dueDate": "required|string",
        "progress": "required|string",
        "instructor": "required|string",
        "subject": "required|string"
    };

    try {
        // Validate request body using validator
        const isValid = await validator(req.body, validationRule);
        
        // If validation fails, respond with an error
        if (!isValid) {
            return res.status(400).send({
                success: false,
                message: 'Validation failed for task data',
                data: 'Invalid input data'
            });
        }
        
        // If validation passes, continue to next middleware
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Server error during task validation',
            error: err.message
        });
    }
};

module.exports = {
    saveUser,
    saveTask
};
