// WeakMap and WeakSet hold objects weakly (GC-friendly).
// Run: node examples/17-weakmap-weakset.js

const cache = new WeakMap();
const user = { id: 1 };

cache.set(user, "cached data");
console.log(cache.get(user)); // cached data
console.log(cache.has(user)); // true

const visited = new WeakSet();
visited.add(user);
console.log(visited.has(user)); // true

console.log(cache.size); // undefined (WeakMap has no size)

// Try this: confirm that a primitive key throws.
