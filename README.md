# urlenparser

## How to use

```javascript
var urlenparser = require('urlenparser');

urlenparser(req, function (err, fields) {

});
```

#### urlenparser(req, [options], callback)

Options:

* `maxKeys` maximum number of keys for the result *(default to 100)*
* `maxLength` maximum size in octet *(default to 10240)*

The callback gets two arguments `(err, fields)`

* `err`:

  * err.message to `Unsupported Media Type` and err.statusCode to `415`
  * err.message to `Length Required` and err.statusCode to `411`
  * err.message to `Request Entity Too Large` and err.statusCode to `413`
  * an error emitted by `req`

* `fields` is an `Object` containing the result
