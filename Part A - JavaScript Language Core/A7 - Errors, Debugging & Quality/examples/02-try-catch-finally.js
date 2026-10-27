// catch handles a thrown error; finally runs either way.
// Run: node examples/02-try-catch-finally.js

try {
  JSON.parse("not JSON");
} catch (error) {
  console.log(error.name); // SyntaxError
  console.log(error.message); // message depends on runtime
} finally {
  console.log("cleanup runs");
}

// Try this: parse valid JSON and observe that finally still runs.
