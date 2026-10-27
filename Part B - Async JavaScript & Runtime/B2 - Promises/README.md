# B2 — Promises

**Time:** 1–2 weeks · **Priority:** `[B]` backend-critical

## Topics
- [ ] Promise states, executor, `then`/`catch`/`finally`
- [ ] Chaining and returning values or Promises
- [ ] `Promise.all`, `allSettled`, `race`, and `any`
- [ ] Promisifying callback APIs
- [ ] `Promise.withResolvers()` `[E]`
- [ ] Handling unhandled rejections

## Examples
12 runnable files:
```bash
node examples\01-promise-executor.js
# ... up to 12-with-resolvers.js
```

## Project
Build a **Promise-based HTTP wrapper** with Node's built-in `fetch`:
1. Accept a URL and request options.
2. Return parsed JSON when the response is successful.
3. Retry network failures and temporary server errors (5xx) a limited number of times.
4. Do not retry ordinary client errors (4xx).
5. Return a clear final error when all attempts fail.
6. Test success, a temporary failure followed by success, a permanent 4xx, and repeated failure. Use a local test server or a stub so the tests are repeatable.

## Done when
- [ ] You can explain pending, fulfilled, and rejected states
- [ ] You can follow a chain and say what its final Promise does
- [ ] You know how thrown errors and returned Promises move through a chain
- [ ] You can choose the correct Promise combinator for a task
- [ ] You can explain why `Promise.race()` does not cancel losing work
- [ ] Your HTTP wrapper retries only the failures you intend
