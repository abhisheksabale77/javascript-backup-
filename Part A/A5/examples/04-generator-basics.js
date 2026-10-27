// A generator pauses at yield and resumes with next().
// Run: node examples/04-generator-basics.js

function* colors() {
  yield "red";
  yield "blue";
  return "finished";
}

const g = colors();
console.log(g.next()); // { value: 'red', done: false }
console.log(g.next()); // { value: 'blue', done: false }
console.log(g.next()); // { value: 'finished', done: true }
console.log(g.next()); // { value: undefined, done: true }

// Try this: use [...colors()] and see that the return value is not included.
