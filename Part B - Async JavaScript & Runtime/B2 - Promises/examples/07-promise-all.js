// Promise.all returns results in input order, not completion order.
// Run: node examples/07-promise-all.js

const delay = (value, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function main() {
  const results = await Promise.all([
    delay("slow first", 20),
    delay("fast second", 1),
  ]);
  console.log(results); // [ 'slow first', 'fast second' ]
}

main();

// Try this: make one input reject and handle Promise.all with catch.
