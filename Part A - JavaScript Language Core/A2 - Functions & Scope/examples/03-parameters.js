// Default, rest, and destructured parameters.
// Run: node examples/03-parameters.js

function greet(name = "friend") {
  return "Hi " + name;
}
console.log(greet());       // Output: Hi friend
console.log(greet("Aman")); // Output: Hi Aman

function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3)); // Output: 6

function show({ name, age }) {
  console.log(name, age); // Output: Riya 22
}
show({ name: "Riya", age: 22 });

// Try this: call `sum()` with no arguments — the result is 0.
