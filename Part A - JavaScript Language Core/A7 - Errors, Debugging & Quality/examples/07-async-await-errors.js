// await turns a rejected promise into a throw you can catch.
// Run: node examples/07-async-await-errors.js

async function loadUser() {
  throw new Error("user service unavailable");
}

async function main() {
  try {
    const user = await loadUser();
    console.log(user);
  } catch (error) {
    console.log("Handled:", error.message);
  }
}

main();

// Try this: remove await and see why the catch does not handle the rejection.
