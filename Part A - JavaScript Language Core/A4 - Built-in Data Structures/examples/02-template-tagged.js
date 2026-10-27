// Template literals interpolate values; tags process them.
// Run: node examples/02-template-tagged.js

const name = "Aman";
const role = "dev";

console.log(`Hi ${name}`); // Hi Aman

function highlight(strings, ...values) {
  return strings.reduce((out, str, i) => {
    const value = values[i] !== undefined ? `[${values[i]}]` : "";
    return out + str + value;
  }, "");
}

console.log(highlight`Name: ${name}, Role: ${role}`);
// Name: [Aman], Role: [dev]

console.log(String.raw`C:\new\test`); // C:\new\test (backslashes kept)

// Try this: write a tag that uppercases every interpolated value.
