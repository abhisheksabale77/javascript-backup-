# A2 — Notes (Simple English)

## 1. Function declaration, expression, arrow
```js
function greet(name) { return "Hi " + name; }          // declaration
const greet2 = function (name) { return "Hi " + name; }; // expression
const greet3 = (name) => "Hi " + name;                 // arrow
```
- Declarations can be called before they appear (hoisted).
- Expressions are stored in a variable; the variable is hoisted, not the function body.
- Arrow functions are shorter. They have no own `this`, no `arguments`, and cannot be used with `new`.
- **Remember:** use declarations for main functions, arrows for callbacks.

## 2. Function hoisting
```js
sayHi();                 // works
function sayHi() { console.log("hi"); }
```
```js
sayBye();                // TypeError
var sayBye = function () {};
```
- **Remember:** a function declaration hoists with its body. A function expression hoists only the variable.

## 3. Parameters
```js
function f(a, b = 2) {}        // default parameter
function g(...nums) {}         // rest parameter → real array
function h({ name, age }) {}   // destructured parameter
```
- Default values apply when the argument is `undefined`.
- `arguments` is an array-like object available in normal functions (not arrows).
- The rest parameter must be last.
- **Remember:** use rest instead of `arguments` — it is a real array.

## 4. Return values and early returns
```js
function abs(n) {
  if (n < 0) return -n;   // early return
  return n;
}
```
- No `return` means the function returns `undefined`.
- `return` stops the function immediately.
- **Remember:** early returns (guard clauses) keep code flat and readable.

## 5. Pure vs impure functions
```js
const add = (a, b) => a + b;          // pure

let total = 0;
function addToTotal(n) { total += n; } // impure
```
- A **pure** function gives the same output for the same input and has no side effects.
- Side effects: logging, changing outside state, file/network I/O, `Math.random()`, `Date.now()`.
- **Remember:** pure functions are easier to test and debug.

## 6. Scope: global, function, block
- **Global** — accessible everywhere.
- **Function scope** — `var` lives here; only visible inside the function.
- **Block scope** — `let` and `const` live inside `{ }`.
```js
if (true) {
  let x = 1;
}
// x is not available here
```
- **Remember:** keep global variables to a minimum.

## 7. Lexical scope and the scope chain
- Lexical scope means a function sees variables from **where it was written**, not where it is called.
- An inner scope can read outer variables; the outer scope cannot read inner ones.
- Lookup walks upward through the scope chain until it reaches the global scope.
- **Remember:** a closure is a function plus the lexical environment where it was created.

## 8. Closures
```js
function counter() {
  let count = 0;
  return () => ++count;
}
const next = counter();
next();   // 1
next();   // 2
```
- The inner function remembers `count` even after `counter()` has finished.
- Uses: private state, factories, memoization, callbacks.
- **Remember:** every call to `counter()` creates a fresh `count`.

## 9. IIFE (Immediately Invoked Function Expression)
```js
(function () {
  const secret = 1;
  console.log(secret);
})();
```
- Runs immediately and keeps its variables private.
- **Remember:** modules replaced most IIFE use cases, but you will still see them.

## 10. Recursion
```js
function factorial(n) {
  if (n <= 1) return 1;     // base case
  return n * factorial(n - 1);
}
```
- Every recursion needs a base case, or you get a stack overflow.
- V8 does not optimise tail calls (Safari does).
- **Remember:** anything recursive can also be written as a loop.

## 11. Higher-order functions and callbacks
- A **higher-order function** takes a function as an argument or returns one.
```js
const doubled = [1, 2, 3].map((x) => x * 2);
```
- A **callback** is a function passed into another function.
- **Remember:** `map`, `filter`, `reduce`, and event listeners are all higher-order.

## 12. Currying, partial application, compose, pipe
```js
const add = (a) => (b) => a + b;
const add5 = add(5);
add5(3);   // 8

const compose = (f, g) => (x) => f(g(x));   // right to left
const pipe = (f, g) => (x) => g(f(x));      // left to right
```
- **Currying:** one argument at a time.
- **Partial application:** fix some arguments now, pass the rest later.
- **Remember:** `compose` runs right to left; `pipe` runs left to right.

## 13. `this` — the 4 rules
1. **Default:** `this` is `undefined` in strict mode/modules, or the global object in sloppy mode.
2. **Method call:** `obj.method()` → `this` is `obj`.
3. **Explicit:** `fn.call(obj)`, `fn.apply(obj)`, `fn.bind(obj)`.
4. **Constructor:** `new Fn()` → `this` is the new object.
- Arrow functions have no own `this`; they use the surrounding scope.
- **Remember:** `this` depends on how the function is **called**, not where it is defined.

## 14. call, apply, bind
```js
function greet(greeting) { return greeting + " " + this.name; }
const user = { name: "Aman" };

greet.call(user, "Hi");      // arguments one by one
greet.apply(user, ["Hi"]);   // arguments as an array
const bound = greet.bind(user);
bound("Hi");                 // bind returns a new function
```
- `call` and `apply` run the function immediately.
- `bind` returns a new function for later.
- **Remember:** call/apply = now, bind = later.

## 15. Arrow functions and `this`
```js
const obj = {
  name: "Aman",
  regular() { return this.name; },  // "Aman"
  arrow: () => this.name,           // undefined (outer this)
};
```
- Arrows inherit `this` from the place they were written.
- Arrows have no `arguments`, no `prototype`, and cannot be constructors.
- **Remember:** use arrows for callbacks, regular functions for object methods.

## 16. Quick summary
- Declarations hoist with their body; expressions do not.
- Closures remember outer variables after the outer function ends.
- `this` is decided at call time; arrows use the outer `this`.
- Pure functions are easy to test; impure functions touch the outside world.
- Use `const` and arrows for small helpers.
