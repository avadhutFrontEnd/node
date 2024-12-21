// app.js

// ****************** readdir() --> Synchronous ****************
const fs = require("fs");

const files = fs.readdirSync("./");
// console.log(files);


// ****************** readdir() --> Asynchronous ****************
fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});
