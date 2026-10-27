// Backreferences match the exact text captured earlier.
// Run: node examples/08-backreferences.js

console.log(/(["']).*?\1/.test("'hello'")); // true (same quote at both ends)
console.log(/(["']).*?\1/.test("'hello\"")); // false (different quotes)

const repeatedWord = /\b(?<word>\w+)\s+\k<word>\b/i;
console.log(repeatedWord.test("go go")); // true
console.log(repeatedWord.test("go stop")); // false

// Try this: find two identical digits next to each other.
