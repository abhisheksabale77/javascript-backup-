// ?. stops safely. ?? only replaces null/undefined.
// Run: node examples/09-optional-nullish.js

const user = { name: "Aman" };
console.log(user?.address?.city); // Output: undefined

let count = null;
console.log(count ?? 10); // Output: 10
console.log(0 ?? 10);     // Output: 0
console.log(0 || 10);     // Output: 10

count ??= 5;
console.log(count);       // Output: 5

// Try this: change `count` to 0 and compare ??= with ||=.
