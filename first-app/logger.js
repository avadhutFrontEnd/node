// logger.js

// (function (exports, require, module, __filename, __dirname) {

console.log(__filename);
console.log(__dirname);

var url = "http://mylogger.io/log";

function log(message) {
  // Send an HTTP request
  console.log(message);
}

module.exports = log;

// module.exports.log = log;  // <----- do this
// exports.log = log;        // <----- do this

// exports = log; // <----- module.exports // cannot reset this "exports" like this <----- can't do that  <---- because this export is a "reference" to "module.exports". You cannot change that reference

// })
