# A2 — Functions & Scope

**Time:** 2 weeks · **Priority:** `[B]` backend-critical

## Topics
- [ ] Declarations, expressions, arrow functions; hoisting differences
- [ ] Parameters: default, rest, `arguments`, destructured params
- [ ] Return values, early returns, pure vs impure functions
- [ ] Scope: global, function, block; lexical scope; scope chain
- [ ] Closures: private state, factories, memoization, closure leaks
- [ ] IIFE
- [ ] Recursion; why V8 has no tail-call optimization
- [ ] Higher-order functions, callbacks
- [ ] Currying, partial application, `compose`, `pipe`
- [ ] `this`: 4 binding rules, arrow `this`, `call`/`apply`/`bind`

## Project
Build a small utility library from scratch:
1. `debounce(fn, ms)` — run only after calls stop for `ms`.
2. `throttle(fn, ms)` — run at most once every `ms`.
3. `once(fn)` — run only the first time.
4. `memoize(fn)` — cache results by argument.
5. `curry(fn)` — turn `f(a, b, c)` into `f(a)(b)(c)`.
6. `EventEmitter` — `on`, `off`, `emit`.

Write a quick test or demo call for each utility.

## Done when
- [ ] You can explain a closure with your own example
- [ ] You can predict `this` for regular functions and arrows
- [ ] You can write a higher-order function without help
- [ ] All 6 utilities work without copy-pasting an implementation
- [ ] You can explain pure vs impure with side-effect examples
