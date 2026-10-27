// Lookarounds check context without including it in the match.
// Run: node examples/07-lookarounds.js

console.log("file.js".match(/\w+(?=\.js)/)[0]); // file (positive lookahead)
console.log("file.txt".match(/\w+(?!\.js)/)[0]); // file (negative lookahead at final t)
console.log("$42".match(/(?<=\$)\d+/)[0]); // 42 (positive lookbehind)
console.log("x42".match(/(?<!\$)\d+/)[0]); // 42 (negative lookbehind)

// Try this: match a number only when followed by "kg", without matching kg.
