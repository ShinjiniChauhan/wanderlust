class ExpressError extends Error {
    constructor (starusCode, message ) {
        super();
        this.starusCode = starusCode;
        this.message = message;
    }
} 

module.exports = ExpressError;