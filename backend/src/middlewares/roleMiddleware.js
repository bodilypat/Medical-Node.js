// src/middlewares/roleMiddleware.js

/**
 * Role-based access control middleware
 * Usage: roleMiddleware('admin', 'editor') or roleMiddleware(['admin','editor'])
 */
module.exports = (...allowedRoles) => {
    // support passing an array: roleMiddleware(['admin','user'])
    if (allowedRoles.length === 1 && Array.isArray(allowedRoles[0])) {
        allowedRoles = allowedRoles[0];
    }

    const normalized = allowedRoles.map(r => String(r).toLowerCase().trim());

    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userRole = String(req.user.role).toLowerCase().trim();

        // allow wildcard
        if (normalized.includes('*') || normalized.includes('any')) {
            return next();
        }

        if (!normalized.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        return next();
    };
};

