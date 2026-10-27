// Map accepts any key type and keeps insertion order.
// Run: node examples/15-map.js

const map = new Map();
map.set("name", "Aman");
map.set(42, "answer");

const objectKey = { id: 1 };
map.set(objectKey, "object key");

console.log(map.get(42)); // answer
console.log(map.get(objectKey)); // object key
console.log(map.size); // 3
console.log(map.has("name")); // true

for (const [key, value] of map) {
  console.log(key, value);
}

// A plain object turns object keys into strings.
const obj = {};
obj[objectKey] = "x";
console.log(obj); // { '[object Object]': 'x' }

console.log(Object.fromEntries(map));
// { '42': 'answer', name: 'Aman', '[object Object]': 'object key' }

// Try this: delete a key and check `size` again.
