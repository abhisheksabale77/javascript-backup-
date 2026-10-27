// match, matchAll, search, and split serve different jobs.
// Run: node examples/10-match-methods.js

console.log("a1 b2".match(/\d/g)); // [ '1', '2' ]
console.log("a1 b2".match(/([a-z])(\d)/)); // full match and captures

const all = [..."a1 b2".matchAll(/(?<letter>[a-z])(?<number>\d)/g)];
console.log(all.map((m) => m.groups.number)); // [ '1', '2' ]

console.log("cat".search(/a/)); // 1
console.log("one,two;three".split(/[,;]/)); // [ 'one', 'two', 'three' ]

// Try this: use matchAll to collect every word and its index.
