# A1 — Interview Prep

## Q1. Difference between `var`, `let`, and `const`?
`var` is function-scoped and hoisted as `undefined`. `let` and `const` are block-scoped and hoisted but not usable before declaration (TDZ). `const` cannot be reassigned; `let` can.

## Q2. What is hoisting? What is the temporal dead zone?
Hoisting moves declarations to the top of their scope. `var` becomes `undefined`; `let`/`const` exist but cannot be accessed until their declaration line — that period is the TDZ.

## Q3. What is the difference between a statement and an expression?
An expression produces a value (`2 + 3`). A statement performs an action (`if`, `for`, `let x = 5`).

## Q4. What are the primitive types in JavaScript?
`string`, `number`, `bigint`, `boolean`, `undefined`, `null`, and `symbol`. Everything else is an object.

## Q5. Difference between `null` and `undefined`?
`undefined` means a value was not assigned. `null` is an intentional empty value set by the developer. `null == undefined` is `true`; `null === undefined` is `false`.

## Q6. Difference between `==` and `===`?
`==` converts types before comparing. `===` compares value and type without conversion. Prefer `===`.

## Q7. What is type coercion? Implicit vs explicit?
Coercion is converting one type into another. Implicit happens automatically (`"5" * 2` → `10`). Explicit is done by you (`Number("5")`).

## Q8. Which values are falsy?
`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy, including `"0"`, `[]`, and `{}`.

## Q9. What does `typeof null` return, and why?
It returns `"object"`. This is a historical bug from the first JavaScript implementation and was never fixed to avoid breaking old code.

## Q10. Difference between `||` and `??`?
`||` returns the right side for any falsy left value (`0`, `""`, `false`). `??` returns the right side only for `null` or `undefined`.

## Q11. What is optional chaining?
`obj?.prop` returns `undefined` instead of throwing when `obj` is `null` or `undefined`.

## Q12. What does `??=` do?
It assigns the right side only when the left side is `null` or `undefined`.

## Q13. Difference between `for...in` and `for...of`?
`for...in` iterates over object keys (including inherited enumerable keys). `for...of` iterates over values of iterables such as arrays, strings, Maps, and Sets.

## Q14. Difference between `break` and `continue`? What is a label?
`break` exits the loop. `continue` skips to the next iteration. A label lets `break`/`continue` target an outer loop.

## Q15. What is the comma operator?
It evaluates expressions left to right and returns the last value: `(1, 2, 3)` returns `3`.

## Common Mistakes
- Using `==` and getting unexpected `true` (`"" == 0`, `null == undefined`).
- Assuming `typeof []` is `"array"` — it is `"object"`.
- Thinking `const` makes an object immutable — it only prevents reassignment.
- Using `for...in` on arrays — it gives string indexes and inherited keys.
- Forgetting `break` in `switch` and falling through.
- Believing `0` or `""` are safe with `||` — use `??` instead.
- Trying to access a `let`/`const` variable before its declaration (TDZ error).
