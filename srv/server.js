const cds = require('@sap/cds');
const proxy = require('@sap/cds-odata-v2-adapter-proxy');

cds.on('bootstrap', (app) => {
    return app.use(proxy());
});

module.exports = cds.server;