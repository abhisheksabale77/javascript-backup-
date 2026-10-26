// JSON keeps only certain values.
// Run: node examples/15-json-edge-cases.js

const data = {
  name: "Aman",
  missing: undefined,
  score: NaN,
  tags: ["a", undefined],
  createdAt: new Date("2024-01-01T00:00:00.000Z"),
};

console.log(JSON.stringify(data));
// {"name":"Aman","score":null,"tags":["a",null],"createdAt":"2024-01-01T00:00:00.000Z"}

try {
  JSON.stringify({ big: 10n });
} catch (err) {
  console.log("BigInt error:", err.message); // Do not know how to serialize a BigInt
}

const circular = {};
circular.self = circular;
try {
  JSON.stringify(circular);
} catch (err) {
  console.log("Circular error:", err.message.split("\n")[0]); // Converting circular structure to JSON
}

// A reviver can turn date strings back into Date objects.
const text = '{"when":"2024-01-01T00:00:00.000Z"}';
const parsed = JSON.parse(text, (key, value) =>
  key === "when" ? new Date(value) : value
);
console.log(parsed.when instanceof Date); // true

// Try this: add a toJSON() method to an object and log the result.
