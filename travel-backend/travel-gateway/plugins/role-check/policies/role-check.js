module.exports = {
    name: 'role-check',
    policy: (actionParams) => {
        return (req, res, next) => {
            const user = req.user;
            const requiredRole = actionParams.role;
            if (!user || user.role !== requiredRole) {
                return res.status(403).json({ message: 'Access denied. You need ' + requiredRole + ' role.' });
            }

            next();
        };
    },
    schema: {
        $id: 'http://express-gateway.io/schemas/policies/role-check.json',
        type: 'object',
        properties: {
            role: { type: 'string' }
        },
        required: ['role']
    }
};
