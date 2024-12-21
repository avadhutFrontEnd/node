// app.js

const EventEmitter = require('events');

//  load the "logger" module --> call "Logger" class --> create new "logger" Object 
const Logger = require('./logger');
const logger = new Logger(); // <------- "logger" object


// **************** Register a "listener" :
// register this "listener" on this "logger" object :
logger.on('messageLogged', (arg) => {
	console.log('Listener called', arg);
});


// on this "logger" Object we have "log" Function, call that "log" Function :
logger.log('message');