
// app.js 
// Node :

// ************** Functions that are "globally" available in "Node" *****
// this Functions are "part of the standard JavaScript". We can use this on the client. We can use this inside of a Browser or inside of Node.


console.log() // "global" object

setTimeout()
clearTimeout()
setInterval()
clearInterval()



// Browser Specific objects e.g "window" object.

// in JavaScript of the "Browser" :

// we have `window` object that `represents our global scope`.

window.console.log();
console.log();

window.setTimeout();

var messaage = '';
window.messaage



// Node Specific objects e.g "global" object.

// 1. in Node Instead of "window" we have "global" object.

// Use "global" :
global.setTimeout();

// use directly :
setTimeout();



var message = '' // <---- "message" variable that we define here, they are not added to the "global" object

console.log(global.message);
