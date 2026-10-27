# A7 — Errors, Debugging, Quality

**Time:** 1 week · **Priority:** `[B]` backend-critical

## Topics
- [ ] Built-in error types: `Error`, `TypeError`, `RangeError`, `SyntaxError`
- [ ] `throw`, `try`, `catch`, `finally`
- [ ] Custom error classes, `cause`, `AggregateError`
- [ ] Async error propagation and rejected promises
- [ ] Read stack traces and find the original failure
- [ ] Debug with DevTools and `node --inspect`
- [ ] Strict mode
- [ ] ESLint and Prettier

## Examples
10 runnable files, numbered by topic:
```bash
node examples\01-error-types.js
# ... up to 10-debugger-statement.js
```

## Project
Choose an earlier project and:
1. Add helpful input validation and clear error handling.
2. Create at least two custom error classes.
3. Preserve a lower-level error with `cause` when wrapping it.
4. Add tests or demo checks for successful and failing cases.
5. Introduce five bugs, find them with breakpoints, and fix them.
6. Run ESLint and Prettier; fix the reported issues.

## Done when
- [ ] You can choose a useful error type and explain why
- [ ] You can handle both synchronous errors and promise rejections
- [ ] You can wrap an error without losing its original cause
- [ ] You can read a stack trace and identify the failing line
- [ ] You can use a breakpoint to inspect values step by step
- [ ] Your project passes its lint and format checks
