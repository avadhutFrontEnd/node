
console.log("Before");
const user = getUser(1); // <----------  How can we access this "user" object in the main program here ?    
console.log(user);
console.log("After");

// callbacks
// promises
// async & await 

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    return { id: id, gitHubUsername: "mosh" };
  }, 2000);

  return 1;
}