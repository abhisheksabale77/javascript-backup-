// Flags change matching behaviour; g/y make lastIndex stateful.
// Run: node examples/02-flags-lastindex.js

console.log(/cat/i.test("CAT")); // true (ignore case)
console.log(/^two$/m.test("one\ntwo\nthree")); // true (line anchors)
console.log(/a.b/s.test("a\nb")); // true (dot matches newline)
console.log(/./u.exec("😀")[0].length); // 2 (one Unicode code point)

const withIndices = /cat/d.exec("cat");
console.log(withIndices.indices[0]); // [ 0, 3 ] (match start and end)

const global = /a/g;
console.log(global.test("a")); // true
console.log(global.lastIndex); // 1
console.log(global.test("a")); // false, then lastIndex resets to 0
console.log(global.lastIndex); // 0

const sticky = /\d/y;
sticky.lastIndex = 2;
console.log(sticky.exec("a12")[0]); // 2 (must match at index 2)

try {
  const unicodeSets = new RegExp("[a-z]", "v");
  console.log(unicodeSets.test("a")); // true on runtimes supporting v
} catch {
  console.log("The v flag is not supported in this runtime.");
}

// Try this: reset global.lastIndex to 0 before the second independent test.
