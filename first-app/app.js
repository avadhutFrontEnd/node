const path = require('path'); // <---  Node assumes that this is a "Built-in Modules"

// require('../path') // <----- Node assumes that this is a File in this Application

const pathObj = path.parse(__filename);

console.log(pathObj);


