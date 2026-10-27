# A2 — Interview Prep

## Q1. Difference between a function declaration, function expression, and arrow function?
A declaration is hoisted with its body. An expression is assigned to a variable and is not callable before that line. An arrow is shorter, has no own `this` or `arguments`, and cannot be used as a constructor.

## Q2. What is function hoisting?
Function declarations are moved to the top of their scope, so they can be called before their definition. Function expressions only hoist the variable, not the function body.

## Q3. Difference between default and rest parameters? What is `arguments`?
A default parameter is used when the argument is `undefined`. A rest parameter collects remaining arguments into a real array. `arguments` is an array-like object available in normal functions only.

## Q4. What is a pure function?
A function that returns the same output for the same input and has no side effects. It does not modify external state or perform I/O.

## Q5. Difference between function scope and block scope?
Function scope is created by a function (`var`). Block scope is created by `{ }` (`let`, `const`). Variables in block scope are not visible outside the block.

## Q6. What is lexical scope?
A function can access variables from the place where it was defined, not where it was called. Scope is decided by the source code structure.

## Q7. What is a closure? Give a use case.
A closure is a function that remembers variables from its outer lexical scope even after the outer function has returned. Use cases: private counters, factories, memoization, callbacks.

## Q8. What is an IIFE and why is it used?
An Immediately Invoked Function Expression runs as soon as it is defined. It creates a private scope so variables do not leak into the global scope.

## Q9. What is recursion? What is a base case?
Recursion is a function calling itself. The base case is the condition that stops the recursion. Without it, the call stack overflows.

## Q10. What is a higher-order function?
A function that takes another function as an argument or returns a function. Examples: `map`, `filter`, `reduce`, `setTimeout`.

## Q11. What is currying? How is it different from partial application?
Currying transforms `f(a, b, c)` into `f(a)(b)(c)` — one argument at a time. Partial application fixes some arguments now and supplies the rest later; it does not require one argument per call.

## Q12. Difference between `call`, `apply`, and `bind`?
`call` invokes the function with `this` and arguments passed one by one. `apply` does the same with arguments in an array. `bind` returns a new function with `this` fixed, without calling it.

## Q13. Explain the four rules of `this`.
1. Default binding: `undefined` in strict mode/modules, global object in sloppy mode.
2. Method binding: `obj.method()` → `this` is `obj`.
3. Explicit binding: `call`/`apply`/`bind`.
4. `new` binding: `this` is the newly created object.

## Q14. Why do arrow functions not have their own `this`?
Arrow functions capture `this` lexically from the surrounding scope. This makes them predictable inside callbacks and avoids the old `const self = this` workaround.

## Q15. What is the scope chain?
The chain of scopes used when resolving a variable. JavaScript looks in the current scope, then outer scopes, then the global scope. If not found, it throws a `ReferenceError`.

## Q16. Why doesn't V8 optimise tail calls?
Proper tail calls were removed from the final ES2015 behaviour in V8 and most engines due to implementation and debugging concerns. Only Safari supports them. Deep recursion can still overflow the stack.

## Common Mistakes
- Detaching a method: `const f = obj.method; f()` loses `this`.
- Using an arrow function as an object method and expecting `this` to be the object.
- Mutating external state inside a function that is assumed to be pure.
- Forgetting `return`, then wondering why the result is `undefined`.
- Putting the rest parameter before another parameter.
- Using `arguments` inside an arrow function.
- Confusing currying with partial application.
- Writing recursion without a base case.
