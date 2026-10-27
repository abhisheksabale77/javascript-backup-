// replace can use capture groups or a callback.
// Run: node examples/11-replace.js

console.log("red red".replace("red", "blue")); // blue red (first only)
console.log("red red".replaceAll("red", "blue")); // blue blue
console.log("a1 b2".replace(/\d/g, "#")); // a# b#

const date = "2026-10".replace(/(?<year>\d{4})-(?<month>\d{2})/, (...args) => {
  const groups = args.at(-1);
  return `${groups.month}/${groups.year}`;
});
console.log(date); // 10/2026

// Try this: redact all digits by returning "X" from a callback.
