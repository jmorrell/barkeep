var tinylr = require('tiny-lr');
var express = require('express');
var Gaze = require('gaze').Gaze;
var cors = require('cors');
var path = require('path');

var injectLivereload = require('./src/inject-livereload');
var urlCallback = require('./src/url-callback');

module.exports = Barkeep;

function Barkeep(root) {
  if (!(this instanceof Barkeep)) {
    return new Barkeep(root);
  }

  this._addToGaze = this._addToGaze.bind(this);
  this.root = root;
  this.server = tinylr();
  this.app = express();
  this.gaze = new Gaze(null, { debounceDelay: 200 });
  this.watchedFiles = [];
}

Barkeep.prototype.listen = function(staticPort, lrPort, done) {
  // Optionally accept the callback as either the first or second argument
  if (typeof staticPort === 'function') {
    done = staticPort;
    staticPort = null;
  } else if (typeof lrPort === 'function') {
    done = lrPort;
    lrPort = null;
  }

  staticPort = staticPort || 9091;
  lrPort = lrPort || 35729;

  this.server.listen(lrPort);

  this.gaze.on('changed', function(filepath) {
    this.server.changed({ body: { files: filepath.replace(this.root, '') } });
  }.bind(this));

  return this.app
    .use(cors())
    .use(injectLivereload(lrPort))
    .use(urlCallback(this._addToGaze))
    .use(express.static(this.root))
    .listen(staticPort, done);
};

// Add a file to be watched for changes
Barkeep.prototype._addToGaze = function(url) {
  // If it's a directory, add index.html to the end
  if (/\/$/.test(url)) {
    url += 'index.html';
  }

  if (this.watchedFiles.indexOf(url) === -1) {
    this.watchedFiles.push(url);
    this.gaze.add(path.join(this.root, url));
    console.log('Added:', url, 'to list of watched files');
  }
};

