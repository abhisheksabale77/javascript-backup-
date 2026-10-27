# A5 — Interview Prep

## Q1. What is the difference between an iterable and an iterator?
An iterable has a `[Symbol.iterator]()` method that returns an iterator. An iterator has a `next()` method that returns `{ value, done }`.

## Q2. How does `for...of` work?
It calls `[Symbol.iterator]()` to get an iterator, calls `next()` repeatedly, and stops when `done` is true. On early exit it calls the iterator's `return()` method if present.

## Q3. What makes an object iterable?
It must implement `[Symbol.iterator]()` and return an iterator whose `next()` returns an object with `value` and `done` properties.

## Q4. What is a generator?
A function declared with `function*`. Calling it returns a stateful iterator. `yield` pauses execution, and `.next()` resumes it.

## Q5. Difference between `yield` and `return`?
`yield` pauses and allows the generator to continue later. `return` finishes the generator; its result has `done: true`.

## Q6. How does `.next(value)` send data into a generator?
After a generator pauses at `yield`, the value passed to the next `.next(value)` becomes the result of that `yield` expression. The first `.next(value)` argument is ignored.

## Q7. What does `yield*` do?
It delegates yielding to another iterable or generator. The outer generator yields all its values and forwards completion.

## Q8. Why are generators called lazy?
They compute a value only when the consumer asks for the next one, rather than building all values at once.

## Q9. Can you reuse a generator object?
No. A generator object has state and is one-shot. After it finishes, later `.next()` calls remain done. Call the generator function again for a fresh one.

## Q10. What do `.return()` and `.throw()` do?
`.return(value)` asks a generator to finish. `.throw(error)` throws at its paused position, where the generator may catch it.

## Q11. How does a `for...of` loop clean up an iterator on `break`?
If the iterator has a `return()` method, `for...of` calls it when exiting early. Generators use this to run `finally` cleanup.

## Q12. What is an async iterable?
An object with `[Symbol.asyncIterator]()` that returns an iterator whose `next()` returns a Promise for an iteration result.

## Q13. What does `for await...of` do?
It awaits each async iterator result and runs the loop body for each value. It can also consume regular synchronous iterables.

## Q14. Give uses for async generators.
Streaming file chunks, paginated API results, database cursors, and event streams — especially when results should be processed one at a time.

## Q15. Are iterator helpers always available?
No. Methods such as iterator `map`, `filter`, `take`, and `toArray` depend on runtime support. Check the Node.js version before using them.

## Common Mistakes
- Treating a plain object as iterable without implementing `[Symbol.iterator]()`.
- Calling `.next()` only once and expecting all generator values.
- Forgetting that a generator object is one-shot.
- Passing a value to the first `.next(value)` and expecting the generator to receive it.
- Spreading an infinite generator, which never finishes.
- Using `for...of` with an async generator instead of `for await...of`.
- Assuming `for await...of` runs loop iterations in parallel.
- Forgetting `try/finally` cleanup when a generator owns a resource.
- Assuming iterator helper methods exist on every Node version.
