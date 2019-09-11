
const util = require('../util');
const proxy = require('http-proxy');
const HttpStatus = require('http-status-codes');
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require('fs');

// corporate proxy to connect to via environment variables
var proxyServer = process.env.HTTPS_PROXY ||
                  process.env.HTTP_PROXY;

const server = proxy.createProxyServer({
    ignorePath: true,
    timeout: process.env.PROXY_TIMEOUT || 15000
});
const proxyOptions = {
    changeOrigin: true
};
let secureOptions = null;

function getSecureOptions () {
    if (secureOptions) {
        return secureOptions;
    }
    secureOptions = proxyOptions;
    try {
        secureOpts = {
            ssl: {
                key: fs.readFileSync(process.env.SSL_KEY || 'ssl-key.pem', 'utf8'),
                cert: fs.readFileSync(process.env.SSL_CERT || 'ssl-cert.pem', 'utf8')
            },
            secure: true
        };
    } catch (ex) {
        console.error('Could not initialize secure proxy. Check SSL_KEY & SSL_CERT env parameters.');
    }
    return secureOptions;
};

function handleProxyError(res, e) {
    console.error('Error proxying request:', e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send(`Proxy error: ${e instanceof Error ? e.code : e}`);
}
const errorHandlerFactory = res => e => handleProxyError(res, e);

exports.handler = async (req, res) => {
    const baseUrl = process.env.PROXY_URL;
    if (!baseUrl) {
        res.status(500);
        return;
    }
    let { '0': delayMs, '1': url } = req.params;
    await util.sleep(delayMs);
    const options = req.secure ? getSecureOptions() : proxyOptions;
    options.target = baseUrl + url;
    if (proxyServer) {
        options.agent = new HttpsProxyAgent(proxyServer);
    }
    var queryList = [];
    Object.keys(req.query).forEach(function(key) {
        queryList.push(key + '=' + req.query[key]);
    });
    if (queryList.length) {
        options.target = options.target + '?' + queryList.join('&');
    }

    try {
        server.web(req, res, options, errorHandlerFactory(res));
    } catch (e) {
        handleProxyError(res, e);
    }
};

// Regexp with capturing groups for delay ms and url
// /delay/:delayMs/url/:url
exports.ROUTE = /^\/delay\/(\d+)\/url\/(.*?)$/;
