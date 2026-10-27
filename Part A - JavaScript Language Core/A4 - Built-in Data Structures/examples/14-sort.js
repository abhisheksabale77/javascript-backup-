// sort uses string order by default. Pass a comparator for numbers.
// Run: node examples/14-sort.js

const nums = [10, 9, 1];

console.log([...nums].sort()); // [ 1, 10, 9 ] (string order)
console.log([...nums].sort((a, b) => a - b)); // [ 1, 9, 10 ]
console.log([...nums].sort((a, b) => b - a)); // [ 10, 9, 1 ]

const users = [
  { name: "A", age: 30 },
  { name: "B", age: 20 },
  { name: "C", age: 20 },
];

const byAge = users.toSorted((a, b) => a.age - b.age);
console.log(byAge.map((u) => u.name)); // [ 'B', 'C', 'A' ] (stable)

// Try this: sort by name with localeCompare.
