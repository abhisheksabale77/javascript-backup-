// JavaScript strings use UTF-16 code units.
// Run: node examples/03-unicode.js

const emoji = "😀";

console.log(emoji.length); // 2 (surrogate pair)
console.log([...emoji].length); // 1 (code point)
console.log(emoji.codePointAt(0).toString(16)); // 1f600
console.log(String.fromCodePoint(0x1f600)); // 😀

// The same visible "é" can be stored in two different ways.
console.log("é" === "e\u0301"); // false
console.log("é".normalize("NFC") === "e\u0301".normalize("NFC")); // true

// Try this: log `"😀"[0]` — it is only half of the pair.
