module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
       let policy = require('./policies/role-check')
       pluginContext.registerPolicy(policy)
    },
    policies: ['role-check'],
    schema: {
        "$id":"https://express-gateway.io/schemas/plugins/blacklist.json"
    }
};