const express = require('express');
const status = require('./src/route/status');
const proxy = require('./src/route/delayProxy');

const app = express();
app.enable('trust proxy');

app.all(status.ROUTE, status.handler);
Object.keys(status.preset).forEach(key => {
    app.all(status.getPresetRoute(key), status.preset[key]);
});

app.all(proxy.ROUTE, proxy.handler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Mock service server listening in port ${port}!`));
