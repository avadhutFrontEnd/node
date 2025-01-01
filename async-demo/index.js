// index.js

console.log("Before");
getUser(1, getUserRepositories);
console.log("After");

function getUserRepositories(user) {
  getRepositories(user.gitHubUsername, getRepoCommits);
}

function getRepoCommits(repos) {
  getCommits(repos[0], displayCommits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API for commits...");
    callback(['commit1', 'commit2', 'commit3']);
  }, 2000);
}

function displayCommits(commits) {
  console.log(commits);
}