// Math helpers for rounding and random values.
// Run: node examples/07-math.js

console.log(Math.round(1.5)); // 2
console.log(Math.round(-1.5)); // -1
console.log(Math.floor(1.9)); // 1
console.log(Math.ceil(1.1)); // 2
console.log(Math.trunc(-1.9)); // -1

console.log(Math.max(3, 7, 2)); // 7
console.log(Math.min(...[3, 7, 2])); // 2

const random = Math.random();
console.log(random >= 0 && random < 1); // true

const min = 1;
const max = 10;
const int = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(int >= min && int <= max); // true

// Try this: write a `randomInt(min, max)` helper.
