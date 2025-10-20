const { validationResult } = require("express-validator");
const logger = require("../config/logger.js");


module.exports.handleValidation = function(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
        return;
    }

    const errors = result.array();
    const parsedErrors = {};
    console.log(errors);

    errors.forEach(error => {
        if (!parsedErrors[error.path]) parsedErrors[error.path] = [];
        parsedErrors[error.path].push(error.msg);
    });

    throw new Error(JSON.stringify(parsedErrors));
}

module.exports.handleError = function(error, req, res, next) {
    logger.error(error.message);
    return res.status(400).json({ status: "failed", message: error.message });
}
