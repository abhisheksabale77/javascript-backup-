// Returning a Promise makes the chain wait for its result.
// Run: node examples/04-return-promise.js

function getUserId() {
  return Promise.resolve(7);
}

function fetchUser(id) {
  return Promise.resolve({ id, name: "Mia" });
}

getUserId()
  .then((id) => fetchUser(id)) // returned Promise is adopted
  .then((user) => console.log(user.name)); // Mia

// Try this: remove `return` from fetchUser and observe the next value.
