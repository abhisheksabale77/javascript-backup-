// A stack trace shows where an error happened and who called it.
// Run: node examples/08-stack-trace.js

function findName(user) {
  return user.name.toUpperCase();
}

function main() {
  try {
    findName(undefined);
  } catch (error) {
    console.log(error.name); // TypeError
    console.log(error.stack.split("\n").slice(0, 3).join("\n"));
    // First line is the error; following frames show the call path.
  }
}

main();

// Try this: pass `{ name: "Mia" }` and confirm the error disappears.
