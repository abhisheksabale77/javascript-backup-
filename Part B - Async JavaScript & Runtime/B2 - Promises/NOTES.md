# B2 — Notes: Promises

Simple-English notes for backend work. Read a section, run its example, then explain the result in your own words.

## 1. What is a Promise?
**Simple idea:** a Promise is an object that represents a result that may arrive later.

It can represent success (data from an HTTP request), failure (a network error), or work that is still in progress. A Promise does not mean the work is automatically running in parallel; it is a way to track and pass along its eventual result.

```js
const result = Promise.resolve("done");
result.then((value) => console.log(value)); // done
```

**Backend connection:** database and network APIs often return Promises because their results are not available immediately.

**Remember:** a Promise is a result container for future success or failure.

## 2. Promise states and settling
A Promise has one of three states:
- **pending** — not finished yet.
- **fulfilled** — finished successfully with a value.
- **rejected** — finished with a reason, usually an Error.

Once fulfilled or rejected, it is **settled** and cannot change state again. Calling `resolve` or `reject` later has no effect.

If a Promise is resolved with another Promise, it adopts that Promise's eventual state instead of fulfilling with the Promise object itself.

**Remember:** each Promise settles once; the first settlement wins.

## 3. The executor runs immediately
The function passed to `new Promise` is called **synchronously**, as soon as the constructor runs. The handlers registered with `.then()` run later as microtasks.
```js
console.log("before");
new Promise((resolve) => {
  console.log("executor now");
  resolve("done");
}).then(() => console.log("handler later"));
console.log("after");
```
Output: `before`, `executor now`, `after`, `handler later`.

Use `new Promise` mainly to adapt callback-based work or create a Promise from an event. Most Promise-returning APIs do not need another Promise wrapped around them.

**Remember:** executor now; `.then` handler after the current synchronous code.

## 4. `.then()` and chaining
`.then(onFulfilled, onRejected)` registers handlers and returns a **new Promise**.
- If `onFulfilled` returns a normal value, the new Promise fulfills with it.
- If it throws, the new Promise rejects with that error.
- If it returns another Promise, the new Promise adopts its result.
```js
Promise.resolve(2)
  .then((n) => n * 3)
  .then((n) => console.log(n)); // 6
```

This lets you describe steps in order without nesting callbacks.

**Gotchas:**
- Forgetting `return` inside a handler means the next step receives `undefined`.
- Ignoring the Promise returned by `.then()` can leave a later rejection unhandled.

**Remember:** each `.then()` creates a new link in the chain.

## 5. Returning values and Promises
Return a value to pass it to the next handler. Return a Promise when the next step must wait for more async work.
```js
getUserId()
  .then((id) => fetchUser(id)) // returning fetchUser's Promise makes the chain wait
  .then((user) => console.log(user.name));
```

Promise resolution “flattens” returned Promises: the chain does not give the next handler a nested Promise.

**Gotcha:** this breaks the chain:
```js
.then((id) => { fetchUser(id); }) // missing return
```

**Remember:** return async work from a handler so the next link waits for it.

## 6. Errors, `.catch()`, and propagation
`.catch(onRejected)` handles a rejection. It is shorthand for `.then(undefined, onRejected)`.
- A thrown error in a `.then()` handler rejects the Promise returned by that `.then()`.
- A `.catch()` can recover by returning a normal value; later handlers then run as fulfilled.
- If the catch handler throws or returns a rejected Promise, the chain remains rejected.
```js
Promise.resolve()
  .then(() => { throw new Error("failed"); })
  .catch((error) => `Recovered: ${error.message}`)
  .then(console.log); // Recovered: failed
```

**Remember:** a rejection travels down the chain until a handler catches it.

## 7. `.finally()`
`.finally(callback)` runs after fulfillment or rejection, usually for cleanup.
- It receives no fulfillment value or rejection reason.
- If its callback completes normally, the original value or rejection continues through the chain.
- If the callback throws or returns a rejected Promise, that new failure replaces the earlier outcome.

**Gotchas:**
- Do not return a cleanup value expecting it to replace the result; normal values from `finally` are ignored.
- Avoid throwing from cleanup unless replacing the original failure is intended.

**Remember:** `finally` normally observes/cleans up; it preserves the original outcome.

## 8. `Promise.all()`
**Simple idea:** wait for every Promise to fulfill, then get their values in input order.
```js
const values = await Promise.all([promiseA, promiseB]);
```
- It fulfills with an array in the same order as the input, not the completion order.
- It rejects as soon as an input rejects.
- It does **not** cancel the other operations; they may continue running.
- An empty array fulfills immediately with `[]`.

**Backend use:** load independent data sources concurrently, then combine their results.

**Remember:** all succeed → ordered values; one rejects → aggregate Promise rejects, but work is not cancelled.

## 9. `Promise.allSettled()`
Waits for every input to settle, whether it fulfills or rejects. It fulfills with result records in input order:
- Success: `{ status: "fulfilled", value }`
- Failure: `{ status: "rejected", reason }`

Use it when every outcome matters, such as a batch where one failure should not hide other results.

**Remember:** unlike `all`, one rejection does not reject the result of `allSettled`.

## 10. `Promise.race()` and timeouts
`Promise.race(promises)` settles with the first input Promise to settle, whether that result is success or failure.

A timeout can be raced against an operation, but **race does not cancel the losing operation**. The HTTP request or timer may keep running unless you cancel it separately (for fetch, use `AbortController`).

An empty race stays pending forever.

**Remember:** race chooses the first result; it does not stop the others.

## 11. `Promise.any()`
`Promise.any(promises)` fulfills with the first fulfilled value. It ignores rejections while another input may still succeed.

If every input rejects, it rejects with an `AggregateError` containing the individual reasons. An empty input also rejects with an empty `AggregateError`.

**Backend use:** ask multiple independent servers for the same data and use the first successful answer.

**Remember:** any = first success; race = first success or failure.

## 12. Promisifying callbacks
Some older Node APIs use callbacks like `(error, value)`. Node's built-in `node:util` provides `promisify` for standard error-first callbacks:
```js
const { promisify } = require("node:util");
const readFile = promisify(require("node:fs").readFile);
```

The returned function gives a Promise that rejects when the callback receives an error and fulfills with its result otherwise. For methods that use `this`, bind the method to its owner before promisifying when needed.

**Remember:** `promisify` adapts callback APIs; do not wrap APIs that already return Promises.

## 13. `Promise.withResolvers()` `[E]`
It creates a Promise and returns its `resolve` and `reject` functions next to it:
```js
const { promise, resolve, reject } = Promise.withResolvers();
```

This can help when the code that creates a Promise is different from the code that settles it. Most everyday code should still prefer returning a Promise from a function.

Support depends on the runtime version. Check `typeof Promise.withResolvers === "function"` before relying on it in a version-sensitive example.

**Remember:** it separates the Promise from its settlement functions; use only when that separation helps.

## 14. Unhandled rejections
A rejection is unhandled if no code attaches a rejection handler to the Promise chain. In Node.js, unhandled rejections can produce warnings or terminate the process depending on runtime policy and configuration.

Handle errors where recovery or useful context is available. At an application boundary, log unexpected failures once and return a safe response. Do not add a catch that silently hides the error.

**Remember:** every Promise chain needs an intentional rejection path.

## 15. Common Promise mistakes
- Forgetting to return a Promise from `.then()`.
- Creating `new Promise` around a function that already returns a Promise.
- Assuming `Promise.all()` cancels remaining work after a rejection.
- Using `race()` as if it cancels a timeout or request.
- Using `all` when every success/failure result must be collected (`allSettled` fits better).
- Confusing `any` (first success) with `race` (first settlement).
- Catching an error and returning nothing without intending to recover.

## 16. Quick summary
- Promise state: pending → fulfilled or rejected; settlement happens once.
- Executor is synchronous; handlers run later.
- `.then()` returns a new Promise; return values and Promises flow to the next link.
- Throws become rejections; `.catch()` can handle or recover.
- `.finally()` normally preserves the original outcome.
- `all` = all success; `allSettled` = all outcomes; `race` = first settlement; `any` = first success.
- `race` does not cancel the work that lost.
- Promisify callback APIs; handle every rejection intentionally.
