class CustomError {
    constructor(statusCode, description, details) {
        this.status = statusCode;
        this.description = description;
        this.details = details;
    }
}

module.exports = CustomError;