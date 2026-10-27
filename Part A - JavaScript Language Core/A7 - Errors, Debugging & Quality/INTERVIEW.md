# A7 — Interview Prep

## Q1. What is the difference between `Error`, `TypeError`, and `RangeError`?
`Error` is the general error type. `TypeError` means a value has an invalid type or operation; `RangeError` means a value is outside an allowed range.

## Q2. Why should you throw an Error object instead of a string?
An Error has a standard `name`, `message`, and usually a stack trace. A string does not provide those debugging details.

## Q3. What does `finally` do?
It runs after `try`/`catch` whether the operation succeeds, throws, or returns. It is commonly used for cleanup.

## Q4. What happens if `finally` returns a value?
That return overrides an earlier return or thrown error. Avoid returning or throwing from `finally` unless that override is intentional.

## Q5. How do you create a custom error class?
Extend `Error`, call `super(message)`, and set a useful `name` and any extra fields. Then callers can check it with `instanceof`.

## Q6. What is an error `cause`?
It is the original error or value attached when wrapping an error: `new Error("context", { cause })`. It preserves the lower-level failure.

## Q7. What is `AggregateError`?
An error containing multiple errors in its `.errors` property. `Promise.any()` uses it when every input promise rejects.

## Q8. Does `Promise.all()` throw an `AggregateError` when an input rejects?
No. It rejects as soon as one input rejects, using that rejection reason. `Promise.any()` uses `AggregateError` if all inputs reject.

## Q9. How does a throw inside an async function behave?
It rejects the promise returned by the async function. The caller can handle it with `await` inside `try/catch` or with `.catch()`.

## Q10. Why might `try/catch` fail to catch an async error?
If the promise is not awaited or returned inside the `try`, its rejection happens outside that control flow. Await or return the promise so the error reaches the handler.

## Q11. Why is `forEach` a poor fit for async callbacks?
`forEach` does not wait for callback promises. Use `for...of` for sequential work or `Promise.all(array.map(...))` for parallel work.

## Q12. What is an unhandled promise rejection?
A promise rejects and no code handles the rejection. It can cause warnings or process termination depending on the runtime policy; handle it deliberately.

## Q13. How do you read a stack trace?
Read the error name and message, then find the first relevant frame in your application. Lower frames show the callers that led there.

## Q14. How can you debug a Node.js program with Chrome DevTools?
Start it with `node --inspect app.js`, open `chrome://inspect`, attach DevTools, set breakpoints, and inspect variables and the call stack.

## Q15. What does the `debugger` statement do?
It pauses execution when a debugger is attached. Without an attached debugger, execution continues.

## Q16. What does strict mode change?
It catches some unsafe behavior: assigning to an undeclared variable throws, plain function calls have `this` as `undefined`, and duplicate parameters are disallowed. Modules and classes are strict automatically.

## Q17. Difference between ESLint and Prettier?
ESLint checks code against rules and reports possible issues. Prettier formats code consistently. Formatting alone does not prove correctness.

## Q18. Where should an application handle errors?
Handle an error where the code can recover or add useful context. Otherwise, let it reach a clear boundary (such as an API handler) that can log it and return a safe response.

## Common Mistakes
- Throwing strings instead of Error objects.
- Catching an error and silently ignoring it.
- Returning from `finally` and accidentally hiding the original result or error.
- Wrapping an error without preserving it as `cause`.
- Starting a promise in `try` without awaiting or returning it.
- Using `forEach(async ...)` and assuming it waits.
- Logging an error and then also rethrowing it at every layer (duplicate logs).
- Assuming stack trace formatting is identical in every runtime.
- Thinking strict mode makes code secure by itself.
- Treating a clean Prettier run as proof that code is correct.
