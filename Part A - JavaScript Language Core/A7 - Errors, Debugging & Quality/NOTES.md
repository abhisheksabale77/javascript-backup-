# A7 — Notes (Simple English, Deep Dive)

Each section has: **Quick idea → Deep dive → Gotchas → Remember**.

## 1. Error objects and built-in types
**Quick idea:** an error object describes something that went wrong.

**Deep dive:**
- `Error` is the base type. Useful built-ins include `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`, and `URIError`.
- Errors have `name` and `message`; engines usually add `stack`.
- Use a specific type when it describes the problem: wrong type → `TypeError`; out-of-range value → `RangeError`.
```js
const error = new TypeError("Expected a number");
console.log(error.name, error.message); // TypeError Expected a number
```

**Gotchas:**
- Stack format differs between engines; do not parse it as a stable data format.
- A caught value is not guaranteed to be an Error unless your code controls what is thrown.

**Remember:** errors are objects carrying meaning and debugging information.

## 2. `throw` and error values
**Quick idea:** `throw` stops the current path and sends a value to an error handler.

**Deep dive:**
- JavaScript allows throwing any value, but throw an `Error` object so callers get a message and stack.
- Use `throw new TypeError(...)` for invalid types and `throw new Error(...)` for general failures.
- Throwing is synchronous: execution jumps to the nearest matching `catch` up the call stack.
```js
function requireName(name) {
  if (!name) throw new TypeError("name is required");
  return name;
}
```

**Gotchas:**
- Throwing strings or plain objects loses the standard Error features.
- Do not catch an error only to ignore it; handle it, add context, or rethrow it.

**Remember:** throw an Error object and include a useful message.

## 3. `try`, `catch`, and `finally`
**Quick idea:** `try` runs risky code, `catch` handles a thrown error, `finally` runs during cleanup.

**Deep dive:**
- A `try` block needs a `catch`, a `finally`, or both.
- `catch (error)` receives the thrown value.
- `finally` runs whether the `try` succeeds, throws, returns, or breaks.
- A `return` or `throw` inside `finally` overrides an earlier return or error.
```js
try {
  JSON.parse("bad");
} catch (error) {
  console.log(error.name); // SyntaxError
} finally {
  console.log("cleanup");
}
```

**Gotchas:**
- Avoid `return` in `finally`; it can hide the real result or error.
- `try/catch` catches synchronous throws in its block, not errors thrown later by an unrelated callback.

**Remember:** use `finally` for cleanup, not for changing the result.

## 4. Custom error classes
**Quick idea:** custom errors let callers identify expected failure types.

**Deep dive:**
- Extend `Error`; call `super(message)` before using `this`.
- Set `name` to the custom class name. `new.target.name` also works for subclasses.
- Add useful data such as `statusCode` or a validation field.
```js
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = new.target.name;
    this.statusCode = 404;
  }
}
```
- Callers can use `error instanceof NotFoundError` to handle a known case.

**Gotchas:**
- Do not use error messages as the only way to decide error type; messages can change.
- Keep error classes small and focused on useful information.

**Remember:** custom error type = a clear signal to the code handling the error.

## 5. Error `cause` and wrapping errors
**Quick idea:** add context while keeping the original error attached.

**Deep dive:**
- `new Error(message, { cause })` stores the original value in `error.cause`.
- Wrap low-level errors when adding useful context, such as which file or operation failed.
- Log or inspect the chain at the application boundary.
```js
try {
  JSON.parse("bad");
} catch (cause) {
  throw new Error("Could not load settings", { cause });
}
```

**Gotchas:**
- Wrapping without `cause` discards valuable debugging context.
- `cause` can be any value; do not assume it is always an Error.

**Remember:** add context, do not erase the root cause.

## 6. `AggregateError`
**Quick idea:** one error object can represent several failures.

**Deep dive:**
- `new AggregateError(errors, message)` stores multiple errors in `.errors`.
- Promise combinators such as `Promise.any()` reject with an `AggregateError` if every input rejects.
- Inspect each member error when the failures need separate handling.
```js
const error = new AggregateError(
  [new Error("first"), new Error("second")],
  "All attempts failed",
);
console.log(error.errors.length); // 2
```

**Gotchas:**
- Do not use it for unrelated errors that should be handled independently.
- `Promise.all()` rejects with the first rejection, not an `AggregateError`.

**Remember:** AggregateError is useful when multiple operations fail as one task.

## 7. Async errors and rejected promises
**Quick idea:** a thrown error in async work becomes a rejected promise.

**Deep dive:**
- A throw inside an `async` function rejects the promise it returns.
- `await promise` throws the rejection reason, so normal `try/catch` works around it.
- Promise chains use `.catch(handler)`; returning a rejected promise continues the rejection chain.
- Put `try/catch` around the operation that can fail, or handle it at a clear boundary.
```js
async function load() {
  try {
    return await Promise.reject(new Error("network failed"));
  } catch (error) {
    return `Handled: ${error.message}`;
  }
}
```

**Gotchas:**
- `try/catch` does not catch a promise rejection that you start but never await or return.
- `array.forEach(async () => ...)` does not wait for callbacks; use `for...of` or `Promise.all`.
- Unhandled rejections can terminate a Node process depending on runtime policy; handle rejections deliberately.

**Remember:** every promise needs an owner that awaits it or handles its rejection.

## 8. Reading stack traces
**Quick idea:** a stack trace shows the path of function calls that led to an error.

**Deep dive:**
- Read the error name/message first.
- Find the first stack frame in your own code; it usually points to the failing operation.
- Read lower frames to learn who called it.
- Source maps can map generated code back to original files.
```text
TypeError: Cannot read properties of undefined
    at getName (app.js:12:10)
    at main (app.js:20:3)
```

**Gotchas:**
- The top frame may be a library or internal function; find the first relevant application frame.
- Async stack traces can include awaited call paths, but exact formatting varies.

**Remember:** message first, then the first relevant file and line.

## 9. Debugging with breakpoints
**Quick idea:** pause execution and inspect the real values instead of guessing.

**Deep dive:**
- Run Node with `node --inspect app.js`; open `chrome://inspect` in Chrome to attach DevTools.
- Set a breakpoint, then step over, step into, or step out of calls.
- Inspect local variables, the call stack, and the watch panel.
- `debugger;` pauses when an inspector is attached; without one, execution continues.
- Conditional breakpoints stop only when a chosen condition is true.

**Gotchas:**
- Debugging changes timing; async bugs may behave differently when paused.
- Remove temporary `debugger` statements before shipping.

**Remember:** reproduce the bug, pause near it, inspect values, then trace backward.

## 10. Strict mode
**Quick idea:** strict mode catches some unsafe JavaScript behavior earlier.

**Deep dive:**
- Enable in a script with `"use strict";` at the top of its function or file.
- ES modules and class bodies are strict automatically.
- Plain function calls have `this === undefined` instead of the global object.
- Assigning to an undeclared variable throws `ReferenceError`.
- Strict mode also rejects duplicate parameter names and `with`.

**Gotchas:**
- `"use strict"` must appear before other statements in its scope to take effect.
- It does not make code secure by itself; it only changes language behavior.

**Remember:** modules and classes already use strict mode.

## 11. ESLint and Prettier
**Quick idea:** ESLint finds code problems; Prettier formats code consistently.

**Deep dive:**
- ESLint checks code against rules: unused variables, suspicious patterns, style choices, and more.
- Prettier rewrites formatting: indentation, quotes, line wrapping, and semicolons.
- They solve different problems; a common setup runs both from npm scripts.
- Fix meaningful lint warnings instead of disabling rules without understanding them.

**Gotchas:**
- Formatting does not prove code is correct.
- Linting cannot replace tests or code review.

**Remember:** Prettier formats; ESLint reports code issues.

## 12. Quick summary
- Throw Error objects; use specific or custom classes for meaningful cases.
- `finally` is for cleanup; avoid return/throw there.
- Preserve the root error with `{ cause }` when adding context.
- `await` inside `try/catch` handles promise rejection.
- Every promise needs a rejection handler or an awaiting caller.
- Read the error message and first relevant stack frame.
- Breakpoints reveal actual values; strict mode catches unsafe patterns.
- Prettier formats; ESLint checks rules.
