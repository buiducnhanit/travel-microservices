exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
        console.log("🔍 Headers received in Service:", req.headers);
        const userRole = req.header("x-user-role");
        console.log("🔍 User Role in Service:", userRole);
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: "Permission Denied" });
        }
        next();
    };
};

exports.extractUserFromHeaders = (req, res, next) => {
    req.user = {
        id: req.headers["x-user-id"] || null,
        role: req.headers["x-user-role"] || "User"
    };
    next();
};
