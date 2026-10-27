// for...of calls next() until done is true; break triggers return().
// Run: node examples/03-for-of-mechanics.js

const iterable = {
  [Symbol.iterator]() {
    let n = 1;
    return {
      next() {
        return n <= 3 ? { value: n++, done: false } : { done: true };
      },
      return() {
        console.log("iterator cleanup");
        return { done: true };
      },
    };
  },
};

for (const value of iterable) {
  console.log(value);
  if (value === 2) break;
}
// Output:
// 1
// 2
// iterator cleanup

// Try this: remove break and observe that return() is not called.
