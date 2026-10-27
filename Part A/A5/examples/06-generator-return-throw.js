// return() closes a generator; throw() throws at its paused position.
// Run: node examples/06-generator-return-throw.js

function* catchesError() {
  try {
    yield "ready";
  } catch (error) {
    yield `caught: ${error.message}`;
  } finally {
    console.log("cleanup");
  }
}

const g = catchesError();
console.log(g.next()); // { value: 'ready', done: false }
console.log(g.throw(new Error("oops"))); // { value: 'caught: oops', done: false }
console.log(g.next()); // cleanup, then { value: undefined, done: true }

function* work() {
  try {
    yield "working";
  } finally {
    console.log("work cleanup");
  }
}

const task = work();
task.next();
console.log(task.return("stopped")); // cleanup, { value: 'stopped', done: true }

// Try this: add a finally block to your own generator.
