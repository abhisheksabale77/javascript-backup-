// any returns the first success and ignores earlier failures.
// Run: node examples/10-promise-any.js

async function main() {
  const value = await Promise.any([
    Promise.reject(new Error("server A failed")),
    Promise.resolve("server B responded"),
    Promise.resolve("server C responded"),
  ]);
  console.log(value); // server B responded

  try {
    await Promise.any([
      Promise.reject(new Error("A failed")),
      Promise.reject(new Error("B failed")),
    ]);
  } catch (error) {
    console.log(error instanceof AggregateError); // true
    console.log(error.errors.length); // 2
  }
}

main();

// Try this: make the second Promise fulfill before the first.
