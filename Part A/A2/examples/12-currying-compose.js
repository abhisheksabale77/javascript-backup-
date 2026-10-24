// Currying and composition.
// Run: node examples/12-currying-compose.js

const add = (a) => (b) => a + b;
const add5 = add(5);
console.log(add5(3)); // Output: 8

const compose = (f, g) => (x) => f(g(x));
const pipe = (f, g) => (x) => g(f(x));

const double = (n) => n * 2;
const square = (n) => n * n;

console.log(compose(double, square)(3)); // Output: 18 (square first)
console.log(pipe(double, square)(3)); // Output: 36 (double first)

// Try this: add a third function to the pipe.
