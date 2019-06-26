
const util = require('../util');
const HttpStatus = require('http-status-codes');

const handler = async (req, res) => {
    const {
        code = HttpStatus.OK,
        delay = 0
    } = req.params;

    res.status(code);
    await util.sleep(delay);
    res.send(`Response ${code}. ${HttpStatus.getStatusText(code)}`);
};
const handlerFactory = code => {
    return async (req, res) => {
        req.params.code = code;
        await handler(req, res);
    };
};

exports.ROUTE = ['/delay/:delay/status/:code', '/status/:code', '/status'];
exports.handler = handler;

exports.preset = {
    ok: handlerFactory(HttpStatus.OK),
    error: handlerFactory(HttpStatus.INTERNAL_SERVER_ERROR),
    forbidden: handlerFactory(HttpStatus.FORBIDDEN)
};
exports.getPresetRoute = key => [`/delay/:delay/${key}`, `/${key}`];
