module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
       let policy = require('./policies/custom-jwt')
       pluginContext.registerPolicy(policy)
    },
    policies: ['custom-jwt'],
    schema: {
        "$id":"https://express-gateway.io/schemas/plugins/blacklist.json"
    }
};