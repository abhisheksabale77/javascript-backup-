# A5 — Notes (Simple English, Deep Dive)

Each section has: **Quick idea → Deep dive → Gotchas → Remember**.

## 1. Iterable and iterator protocols
**Quick idea:** an iterable can produce an iterator; an iterator produces values one at a time.

**Deep dive:**
- An **iterable** has a method at `[Symbol.iterator]()` that returns an iterator.
- An **iterator** has `next()`. Each call returns `{ value, done }`.
- `done: false` means there is a value. `done: true` means iteration is finished.
- Arrays, strings, Maps, and Sets are built-in iterables.
```js
const iterator = ["a", "b"][Symbol.iterator]();
console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

**Gotchas:**
- An iterator is usually stateful; each call advances it.
- A plain object is not iterable by default, so `for...of { a: 1 }` throws.

**Remember:** iterable = can make an iterator; iterator = has `next()`.

## 2. How `for...of` works
**Quick idea:** `for...of` repeatedly asks an iterator for its next value.

**Deep dive:**
- It calls `[Symbol.iterator]()` once to get an iterator.
- It calls `next()` until the result has `done: true`.
- It assigns each result's `value` to the loop variable.
- On early exit (`break`, `return`, or an exception), it calls the iterator's optional `return()` method. This lets iterators clean up resources.
```js
const iterator = [10, 20][Symbol.iterator]();
let step = iterator.next();
while (!step.done) {
  console.log(step.value);
  step = iterator.next();
}
```

**Gotchas:**
- `for...in` enumerates object keys; `for...of` consumes iterable values.
- Early exit cleanup only happens when the iterator provides `return()`.

**Remember:** `for...of` is convenient syntax over the iterator protocol.

## 3. Create a custom iterable
**Quick idea:** add `[Symbol.iterator]()` to let an object work with `for...of`.

**Deep dive:**
- `[Symbol.iterator]()` must return an iterator with `next()`.
- The iterator can keep private progress in local variables (a closure).
- It can be a generator method: `*[Symbol.iterator]() { ... }`.
```js
const range = {
  start: 1,
  end: 3,
  *[Symbol.iterator]() {
    for (let n = this.start; n <= this.end; n++) yield n;
  },
};
console.log([...range]); // [ 1, 2, 3 ]
```

**Gotchas:**
- If `next()` returns something other than an object, iteration throws.
- A custom iterable can be reusable if each `[Symbol.iterator]()` call creates fresh state.

**Remember:** define the protocol once; then `for...of`, spread, and destructuring can use it.

## 4. Generator basics
**Quick idea:** a generator is a function that can pause and continue.

**Deep dive:**
- Write `function*`; call it to get a generator object (an iterator).
- `yield value` pauses and makes the next result `{ value, done: false }`.
- The next `.next()` resumes from that point.
- The function's final `return` value is yielded with `done: true`; normal `for...of` ignores it.
```js
function* colors() {
  yield "red";
  yield "blue";
  return "finished";
}
const g = colors();
console.log(g.next()); // { value: 'red', done: false }
```

**Gotchas:**
- Calling a generator function does not run its body; the first `.next()` starts it.
- A generator object is one-shot. After it is done, it stays done.

**Remember:** `yield` pauses; `.next()` resumes.

## 5. Two-way communication with `.next(value)`
**Quick idea:** `.next(value)` can send a value back into a paused generator.

**Deep dive:**
- The value passed to the first `.next(value)` is ignored because the generator has not paused at a `yield` yet.
- On later calls, the value becomes the result of the paused `yield` expression.
```js
function* ask() {
  const answer = yield "What is your name?";
  yield `Hello, ${answer}`;
}
const g = ask();
console.log(g.next());       // asks the question
console.log(g.next("Mia")); // sends "Mia" into the paused yield
```

**Gotchas:**
- The value sent in goes into the most recent paused `yield`, not the next one.
- Generator control flow can be harder to follow than a normal function; use this feature only when useful.

**Remember:** `yield` sends out; the next `.next(value)` sends in.

## 6. Generator lifecycle: `.return()`, `.throw()`, cleanup
**Quick idea:** generator methods can finish it, throw inside it, or clean up resources.

**Deep dive:**
- `.return(value)` asks the generator to finish and returns `{ value, done: true }`.
- `.throw(error)` throws at the generator's current paused position; it can catch the error.
- `try/finally` runs cleanup when the generator finishes or is closed early.
- `for...of` calls the generator's `return()` when the loop exits early.
```js
function* work() {
  try { yield "working"; }
  finally { console.log("cleanup"); }
}
```

**Gotchas:**
- A `finally` block can yield, which can delay closing; avoid doing this unless needed.
- Cleanup is important when an iterator owns a file, lock, or other resource.

**Remember:** use `try/finally` when early exit must release something.

## 7. `yield*` delegation
**Quick idea:** `yield*` forwards values from another iterable or generator.

**Deep dive:**
- `yield* iterable` yields each value from that iterable.
- It works with arrays, strings, generators, and custom iterables.
- It also forwards the final return value of a delegated generator as the result of the `yield*` expression.
```js
function* all() {
  yield 1;
  yield* [2, 3];
  yield 4;
}
console.log([...all()]); // [ 1, 2, 3, 4 ]
```

**Gotchas:**
- `yield*` is delegation, not just a loop; control and completion are forwarded.

**Remember:** use it to compose generator output.

## 8. Lazy evaluation and infinite generators
**Quick idea:** generators create each value only when requested.

**Deep dive:**
- An array stores all results at once; a generator can produce one at a time.
- This is useful for large data and infinite sequences.
- Pair infinite generators with a limit (`take`) so consumption eventually stops.
```js
function* ids() {
  let id = 1;
  while (true) yield id++;
}
```

**Gotchas:**
- Spreading an infinite generator hangs because it never finishes.
- Lazy does not automatically mean faster; it mainly avoids creating all values at once.

**Remember:** request only what you need; do not collect infinite output.

## 9. Async iterators and `for await...of`
**Quick idea:** async iterators produce values that may arrive later.

**Deep dive:**
- An async iterable has `[Symbol.asyncIterator]()` returning an object whose `next()` returns a Promise for `{ value, done }`.
- An `async function*` creates an async generator automatically.
- `for await...of` waits for each result before moving to the next.
- It works with async iterables and also regular synchronous iterables.
```js
async function* values() {
  yield "first";
  yield "second";
}
```

**Gotchas:**
- `for await...of` must be inside an `async` function (or an ESM module with top-level await).
- It processes values sequentially; it does not run every iteration in parallel.

**Remember:** async iteration = `next()` is awaited.

## 10. Async generators: where they help
**Quick idea:** async generators stream results from asynchronous work.

**Deep dive:**
- Use them for paginated APIs, database cursors, file chunks, or event streams.
- Yield one result at a time instead of loading everything into memory.
- Handle cancellation/early exit by closing the iterator and cleaning up in `finally`.
```js
async function* pages(fetchPage) {
  for (let page = 1; ; page++) {
    const items = await fetchPage(page);
    if (items.length === 0) return;
    yield items;
  }
}
```

**Gotchas:**
- Add a clear stop condition, or the consumer can wait forever.
- Catch and handle network/file errors at the appropriate boundary.

**Remember:** async generator = async work + one-at-a-time output.

## 11. Iterator helpers `[E]`
**Quick idea:** newer runtimes add array-like methods to iterators without making arrays.

**Deep dive:**
- Helpers include `map`, `filter`, `take`, `drop`, `flatMap`, `reduce`, and `toArray`.
- They are lazy: a helper pipeline requests values as they are consumed.
- Example on supported runtimes: `Iterator.from([1, 2, 3]).map(x => x * 2).take(2).toArray()`.
- Availability depends on the JavaScript runtime version; Node 20 may not support them.

**Gotchas:**
- A helper pipeline is still one-shot.
- Do not assume these methods exist just because array methods do.

**Remember:** check runtime support; arrays have eager methods, iterator helpers are lazy.

## 12. Quick summary
- Iterable: has `[Symbol.iterator]()`; iterator: has `next()`.
- Generator: iterator with pause/resume using `yield` and `.next()`.
- `yield*` delegates to another iterable.
- Generators are lazy and one-shot.
- Async generator yields values over time; consume it with `for await...of`.
- Use `try/finally` for resource cleanup on early exit.
- Iterator helpers are runtime-version dependent.
