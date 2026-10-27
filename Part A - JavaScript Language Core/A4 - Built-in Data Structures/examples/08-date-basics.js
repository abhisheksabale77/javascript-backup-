// A Date stores milliseconds since the Unix epoch.
// Run: node examples/08-date-basics.js

const d = new Date("2024-01-15T10:30:00.000Z");

console.log(d.toISOString()); // 2024-01-15T10:30:00.000Z
console.log(d.getUTCFullYear()); // 2024
console.log(d.getUTCMonth()); // 0 (January)
console.log(d.getUTCDate()); // 15
console.log(d.getUTCHours()); // 10

// Dates are mutable, so copy before changing.
const copy = new Date(d);
copy.setUTCFullYear(2025);
console.log(d.getUTCFullYear(), copy.getUTCFullYear()); // 2024 2025

console.log(new Date("bad").getTime()); // NaN

// Try this: log local getHours() and compare with getUTCHours().
