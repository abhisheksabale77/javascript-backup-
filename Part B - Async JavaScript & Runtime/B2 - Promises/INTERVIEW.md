# B2 — Interview Prep

## Q1. What is a Promise?
An object representing the eventual success or failure of an asynchronous operation. It can be pending, fulfilled, or rejected.

## Q2. What are the Promise states?
Pending, fulfilled, and rejected. A fulfilled or rejected Promise is settled and cannot change state again.

## Q3. Does the Promise executor run synchronously?
Yes. The function passed to `new Promise(...)` runs immediately. Handlers registered with `.then()` run later as microtasks.

## Q4. What does `.then()` return?
A new Promise. It fulfills with the handler's returned value, adopts a returned Promise, or rejects if the handler throws.

## Q5. What happens when a `.then()` handler returns a Promise?
The next link waits for that Promise and receives its fulfilled value, or receives its rejection. Promises are flattened rather than nested.

## Q6. What happens if you forget `return` inside `.then()`?
The next handler receives `undefined` immediately instead of waiting for the async operation that was started.

## Q7. What is `.catch()` shorthand for?
`.then(undefined, onRejected)`. It handles a rejection and can recover by returning a normal value.

## Q8. How does `.finally()` behave?
It runs after success or failure and receives no result. If it completes normally, the original value or rejection continues; if it throws/rejects, that new failure replaces the outcome.

## Q9. What does `Promise.all()` do?
It fulfills when every input fulfills, returning values in input order. It rejects on the first rejection, but does not cancel the other operations.

## Q10. When should you use `Promise.allSettled()`?
When you need the outcome of every input, even if some reject. It returns records with `status` and `value` or `reason`.

## Q11. Difference between `Promise.race()` and `Promise.any()`?
`race` settles with the first input to fulfill or reject. `any` fulfills with the first success and rejects with `AggregateError` only when all inputs reject.

## Q12. Does `Promise.race()` cancel the other Promises?
No. Losing operations continue. Use an explicit cancellation mechanism, such as `AbortController` for `fetch`, when cancellation is needed.

## Q13. What is an `AggregateError`?
An Error containing multiple errors in its `.errors` property. `Promise.any()` uses it when all inputs reject.

## Q14. What does promisifying a callback API mean?
Adapting a callback-style function—usually `(error, value)`—to return a Promise. Node provides `util.promisify` for standard error-first callbacks.

## Q15. What is `Promise.withResolvers()`?
A method that returns `{ promise, resolve, reject }`. It is useful when the Promise and its settlement functions need to be accessed in separate places; support depends on Node version.

## Q16. What is an unhandled rejection?
A Promise rejects and no handler handles that rejection chain. Node may warn or terminate based on runtime policy/configuration.

## Q17. How should a server handle an unexpected Promise rejection?
Handle it at a clear boundary: log useful context once, avoid leaking sensitive details, and return a safe error response. Do not silently swallow it.

## Q18. How do you choose a Promise combinator?
Use `all` when all must succeed, `allSettled` to collect every outcome, `race` for the first settlement, and `any` for the first success.

## Common Mistakes
- Forgetting to return a Promise from a `.then()` handler.
- Assuming the `new Promise` executor is asynchronous.
- Assuming `Promise.all()` cancels work after one rejection.
- Using `race` for cancellation without aborting the underlying operation.
- Confusing `Promise.any()` with `Promise.race()`.
- Forgetting that `finally` can replace the result if it throws or rejects.
- Wrapping an already-Promise-based API in an unnecessary `new Promise`.
- Leaving a Promise rejection without an intentional handler.
