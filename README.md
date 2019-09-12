# mock-service-server

Helper for mocking slow and broken services.

### Routes

The server offers following end points:

* `/status/{code}`              = Returns Http Response with specified response code
* `/ok`                         = Http Response `200`
* `/error`                      = Http Response `500`
* `/forbidden`                  = Http Response `403`

#### Delayed routes

* `/delay/{ms}/status/{code}`   = Returns Http Response with specified response code
* `/delay/{ms}/ok`              = Http Response `200`
* `/delay/{ms}/error`           = Http Response `500`
* `/delay/{ms}/forbidden`       = Http Response `403`
* `/delay/{ms}/url/{path}`      = Delayed proxy to given url (base path is defined in PROXY_URL)

### Environment variables

* `PORT`                        = Server port
* `PROXY_TIMEOUT`               = Timeout for proxy
* `PROXY_URL`                   = Base url for `/delay/{ms}/url/{path}` (path is added as is to the base url for proxying)
* `SSL_KEY`                     = Path to the ssl key.pem
* `SSL_CERT`                    = Path to the ssl cert.pem

### Get started

Start by running `node server.js`

If you are using this behind corporate proxy use `HTTP_PROXY` and `HTTPS_PROXY` env variables to configure it.
