// app.js

const EventEmitter = require('events');
const emitter = new EventEmitter();

// **************** Register a "listener" :
// emitter.addListener(); // <-- But we have an alias for this that is "on"
emitter.on('messageLogged', function(){
	console.log('Listener called');
});


// **************** Raise an "event" :
emitter.emit('messageLogged');

// Making a noise, produce a signal --> Signalling 