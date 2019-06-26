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
* `/delay/{ms}/url/{url}`       = Delayed proxy to given url

### Environment variables

* `PORT`                        = Server port
* `PROXY_TIMEOUT`               = Timeout for proxy
* `SSL_KEY`                     = Path to the ssl key.pem
* `SSL_CERT`                    = Path to the ssl cert.pem

### Get started

Start by running `node server.js`