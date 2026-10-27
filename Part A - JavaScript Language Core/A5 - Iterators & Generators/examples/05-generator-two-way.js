// next(value) sends a value into the paused yield expression.
// Run: node examples/05-generator-two-way.js

function* ask() {
  const answer = yield "What is your name?";
  yield `Hello, ${answer}`;
}

const g = ask();
console.log(g.next()); // { value: 'What is your name?', done: false }
console.log(g.next("Mia")); // { value: 'Hello, Mia', done: false }
console.log(g.next()); // { value: undefined, done: true }

// Try this: pass a value to the first next() and notice it is ignored.
