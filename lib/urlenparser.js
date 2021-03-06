var querystring = require('querystring');


/**
 * @param {Object} [options]
 *        {Number} options.maxKeys
 *        {Number} options.maxLength
 */

module.exports = function (req, options, callback) {

  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  options = options || {};
  options.maxLength = options.maxLength || 10240; // 10 ko
  options.maxKeys = options.maxKeys || 100;


  if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
    var err = new Error('Unsupported Media Type');
    err.statusCode = 415;
    return callback(err);
  }

  if (!req.headers['content-length']) {
    var err = new Error('Length Required');
    err.statusCode = 411;
    return callback(err);
  }

  if (req.headers['content-length'] > options.maxLength) {
    var err = new RangeError('Request Entity Too Large');
    err.statusCode = 413;
    return callback(err);
  }


  var body = '';

  req.setEncoding('utf8');

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('error', function (err) {
    callback(err);
  });

  // http-parser made by Joyent will destroy the connection if there is more
  // data than the content-length defined in the headers.

  req.on('end', function () {
    
    if (!req.connection.destroyed) {

      var fields = querystring.parse(body, '&', '=',
                     { "maxKeys": options.maxKeys });

      callback(null, fields);

    }

  });

};
