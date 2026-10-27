// An error stops the program and prints a stack trace.
// Run: node examples/02-stack-trace.js

function getUser() {
  const user = undefined;
  return user.name; // this line throws
}

function main() {
  getUser();
}

main();

// Output (similar to):
// TypeError: Cannot read properties of undefined (reading 'name')
//     at getUser (...\02-stack-trace.js:6:15)
//     at main (...\02-stack-trace.js:10:3)
//     at Object.<anonymous> (...\02-stack-trace.js:13:1)

// Read it like this:
// 1. First line = what went wrong.
// 2. Top "at" line = the exact file and line.

// Try this: fix the error by giving user an object, then run again.
