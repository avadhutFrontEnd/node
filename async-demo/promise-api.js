
// ********* Create a "promise" that is already resolved :
// const p = Promise.resolve({ id: 1 });
// p.then((result) => console.log(result));



// ********  Create a promise that is already "rejected" :
const p = Promise.reject(new Error("reason for rejection..."));
p.catch((error) => console.log(error));



// *********  As a #_Best_Practice_  Whenever you wanna `reject` a promise, it's better to use a Native `Error` object because it will include the `call stack` :

// const p = Promise.reject("reason for rejection...");
// p.catch((error) => console.log(error));
