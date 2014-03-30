module.exports = function(callback) {
  return function(req, res, next) {
    var url = req.url;

    // Remove any url parameters
    url = url.replace(/\?.*$/, '');

    callback(url);
    next();
  };
}
