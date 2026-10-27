// Capture groups extract parts of a match.
// Run: node examples/06-capturing-groups.js

const match = "2026-10".match(/(?<year>\d{4})-(?<month>\d{2})/);
console.log(match[0]); // 2026-10 (whole match)
console.log(match.groups.year, match.groups.month); // 2026 10

const pair = "name: Aman".match(/(name):\s+(?:Aman)/);
console.log(pair[1]); // name (captured)
console.log(pair.length); // 2 (whole match + one capture)

// Try this: add a named `day` group to the date pattern.
