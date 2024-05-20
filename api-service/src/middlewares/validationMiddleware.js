const authorizeValidation = (schema, location = 'body') => {
    return async (req, res, next) => {
        try {
            await schema.validate(req[location], { abortEarly: false });
            next();
        } catch (error) {
            res.status(400).json({ message: error.errors });
        }
    };
}
  
module.exports = { authorizeValidation }