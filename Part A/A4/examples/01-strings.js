// Strings are immutable. Methods return new strings.
// Run: node examples/01-strings.js

const s = "  Hello World  ";

console.log(s.trim());          // Hello World
console.log(s.includes("World")); // true
console.log(s.startsWith("  He")); // true
console.log("abc".slice(1, 3)); // bc
console.log("abc".slice(-2));   // bc
console.log("abc".substring(2, 0)); // ab (arguments swapped)
console.log("a".padStart(3, "0")); // 00a
console.log("ab".repeat(3));    // ababab
console.log("a,b,c".split(",")); // [ 'a', 'b', 'c' ]

const upper = "abc".toUpperCase();
console.log(upper, "abc"); // ABC abc (original unchanged)

// Try this: replace only the first match with replace, then use replaceAll.
