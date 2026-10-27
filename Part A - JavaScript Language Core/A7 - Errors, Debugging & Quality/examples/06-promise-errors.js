// A promise rejection must be returned, awaited, or caught.
// Run: node examples/06-promise-errors.js

function getUser() {
  return Promise.reject(new Error("user service unavailable"));
}

getUser()
  .then((user) => console.log(user))
  .catch((error) => console.log("Handled:", error.message))
  .finally(() => console.log("request finished"));

// Try this: return a resolved promise and observe that catch is skipped.
