// test returns a boolean; exec returns match details.
// Run: node examples/09-test-exec-state.js

const re = /\d+/g;
console.log(re.test("id=42")); // true
console.log(re.lastIndex); // 5
console.log(re.test("id=42")); // false (starts at lastIndex)
console.log(re.lastIndex); // 0 after the failed search

re.lastIndex = 0;
const match = re.exec("id=42");
console.log(match[0], match.index); // 42 3

// Try this: remove g and compare the repeated test calls.
