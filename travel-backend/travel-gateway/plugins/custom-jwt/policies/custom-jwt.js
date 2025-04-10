const jwt = require('jsonwebtoken');

module.exports = {
    name: 'custom-jwt',
    policy: (actionParams) => {
        return (req, res, next) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) return res.sendStatus(401);

            jwt.verify(token, actionParams.secretOrPublicKey, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
            });
        };
    },
    schema: {
        $id: 'custom-jwt',
        type: 'object',
        properties: {
            secretOrPublicKey: { type: 'string' }
        },
        required: ['secretOrPublicKey']
    }
};
