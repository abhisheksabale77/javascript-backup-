// Add Symbol.iterator to make an object work with for...of.
// Run: node examples/02-custom-iterable.js

const range = {
  start: 1,
  end: 3,
  *[Symbol.iterator]() {
    for (let n = this.start; n <= this.end; n++) yield n;
  },
};

console.log([...range]); // [ 1, 2, 3 ]

for (const n of range) console.log(n); // 1, 2, 3

// Try this: change end to 5 and run again.
