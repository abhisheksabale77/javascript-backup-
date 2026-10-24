// call/apply run now. bind returns a new function.
// Run: node examples/14-call-apply-bind.js

function greet(greeting) {
  return greeting + " " + this.name;
}

const user = { name: "Aman" };

console.log(greet.call(user, "Hi")); // Output: Hi Aman
console.log(greet.apply(user, ["Hello"])); // Output: Hello Aman

const bound = greet.bind(user);
console.log(bound("Hey")); // Output: Hey Aman

// Try this: bind with a fixed first argument: `greet.bind(user, "Yo")`.
