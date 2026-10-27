// util.promisify adapts a standard error-first callback API.
// Run: node examples/11-promisify.js

const { promisify } = require("node:util");

function findValue(id, callback) {
  setTimeout(() => {
    if (id < 0) return callback(new Error("id must not be negative"));
    callback(null, { id, value: "found" });
  }, 5);
}

const findValueAsync = promisify(findValue);

async function main() {
  console.log(await findValueAsync(7)); // { id: 7, value: 'found' }
  try {
    await findValueAsync(-1);
  } catch (error) {
    console.log(error.message); // id must not be negative
  }
}

main();

// Try this: promisify a callback function that returns a string.
