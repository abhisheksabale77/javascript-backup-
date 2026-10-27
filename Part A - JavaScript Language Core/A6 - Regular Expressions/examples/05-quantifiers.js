// Quantifiers control repetition; greedy and lazy choose different matches.
// Run: node examples/05-quantifiers.js

console.log(/colou?r/.test("color")); // true (? means zero or one)
console.log(/\d{2,4}/.exec("year 2026")[0]); // 2026

const text = "<a><b>";
console.log(text.match(/<.*>/)[0]); // <a><b> (greedy)
console.log(text.match(/<.*?>/)[0]); // <a> (lazy)

// Try this: use +? to find the shortest match of "aaaa".
