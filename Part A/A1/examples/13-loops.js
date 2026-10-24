// Different loops for different jobs.
// Run: node examples/13-loops.js

for (let i = 1; i <= 3; i++) {
  console.log("for:", i); // Output: for: 1, for: 2, for: 3
}

let n = 0;
while (n < 2) {
  console.log("while:", n); // Output: while: 0, while: 1
  n++;
}

const fruits = ["apple", "banana"];
for (const fruit of fruits) {
  console.log("of:", fruit); // values: apple, banana
}

const person = { name: "Aman", age: 20 };
for (const key in person) {
  console.log("in:", key, person[key]); // keys: name, age
}

// break stops the loop. continue skips one iteration.
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log("skip test:", i); // Output: 0, 1, 3
}

// A label lets break/continue target an outer loop.
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
    console.log("label:", i, j); // Output: 0 0, 1 0, 2 0
  }
}

// Try this: write a loop that prints only even numbers from 1 to 10.
