//middleware/roleMiddleware.js 

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role_id.role_name)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role to access this resource' });
        }
        next();
    }
};

module.exports = authorize;
