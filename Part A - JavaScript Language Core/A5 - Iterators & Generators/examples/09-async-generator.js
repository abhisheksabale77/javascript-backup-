// Async generators can yield values over time.
// Run: node examples/09-async-generator.js

async function* values() {
  yield "first";
  await Promise.resolve();
  yield "second";
}

async function main() {
  for await (const value of values()) {
    console.log(value); // first, then second
  }
}

main();

// Try this: add a third yield after another await.
