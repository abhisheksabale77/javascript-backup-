# A1 — Fundamentals 

**Time:** 1–2 weeks · **Priority:** `[B]` backend-critical

## Topics

- [ ] Syntax, statements vs expressions, ASI, comments
- [ ] Variables: `var`/`let`/`const`, naming rules
- [ ] Primitive types: string, number, bigint, boolean, undefined, null, symbol
- [ ] Objects vs primitives, reference vs value
- [ ] Type coercion, `==` vs `===`, truthy/falsy, `null` vs `undefined`
- [ ] Operators: arithmetic, comparison, logical (`&&`, `||`, `??`), ternary, comma
- [ ] `typeof`, `instanceof`, optional chaining `?.`, nullish assignment `??=`, logical assignment
- [ ] Control flow: `if/else`, `switch`, `try/catch` intro
- [ ] Loops: `for`, `while`, `do...while`, `for...in`, `for...of`, `break`/`continue`, labels

## Examples

13 runnable files, numbered to match `NOTES.md`:

```bash
node examples\01-statements-expressions.js
# ... up to 13-loops.js
```

## Project

Build three small programs:

1. **CLI calculator** — read two numbers and an operator, print the result, handle bad input.
2. **FizzBuzz** — print 1–100 using the Fizz/Buzz/FizzBuzz rules.
3. **Type-coercion quiz** — write 10 tricky expressions, predict each answer, then check with Node.

## Done when

- [ ] You can predict coercion puzzle output before running it
- [ ] You choose `let` vs `const` correctly without thinking
- [ ] You can loop arrays with `for...of` and object keys with `for...in`
- [ ] You can explain `==` vs `===` and when coercion happens
- [ ] Your calculator does not crash on bad input

