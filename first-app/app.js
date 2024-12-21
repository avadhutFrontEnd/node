// app.js

const EventEmitter = require('events');
const emitter = new EventEmitter();

// **************** Register a "listener" :
// emitter.addListener(); // <-- But we have an alias for this that is "on"
emitter.on('messageLogged',  (arg) => {
	console.log('Listener called', arg);
});


// **************** Raise an "event" :
emitter.emit('messageLogged', { id: 1, url: 'http://' });

// Making a noise, produce a signal --> Signalling 