var tamper = require('tamper')

/**
 * Returns a middleware that injects the livereload script before
 * the closing body tag of text/html responses.
 */
module.exports = function(lrPort) {
  return tamper(function(req, res) {
    // strip off the port from the hostname
    var host = req.headers.host.replace(/:.*$/, '');
    var lrUrl = 'http://' + host + ':' + lrPort + '/livereload.js';
    var mime = res.getHeader('Content-Type');

    if (/text\/html/.test(mime)) {
      return function(body) {
        return body.replace(
          /<\/body>/i,
          '  <script src="' + lrUrl + '"></script>\n</body>'
        );
      }
    }
  });
};
