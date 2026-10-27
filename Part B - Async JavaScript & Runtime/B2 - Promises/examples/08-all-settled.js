// allSettled waits for every input and reports each result.
// Run: node examples/08-all-settled.js

async function main() {
  const results = await Promise.allSettled([
    Promise.resolve("ok"),
    Promise.reject(new Error("offline")),
  ]);

  console.log(results.map((result) => result.status));
  // [ 'fulfilled', 'rejected' ]
  console.log(results[0].value); // ok
  console.log(results[1].reason.message); // offline
}

main();

// Try this: add another fulfilled Promise and inspect its record.
