# A1 — Notes (Simple English)

## 1. Statements vs expressions

- An **expression** produces a value: `2 + 3`, `x * 2`, `"hi"`.
- A **statement** performs an action: `let x = 5;`, `if (...)`, `for (...)`.
- An expression can go inside `console.log()`. A statement cannot.
- **Remember:** if it has a value, it is an expression.

## 2. Semicolons (ASI) and comments

- JS can add semicolons automatically (ASI), but not always where you expect.
- Always write semicolons, or let Prettier do it.
- `// single-line comment` and `/* multi-line comment */`.
- **Remember:** never start a line with `(`, `[`, or a backtick right after a previous line without a semicolon.

## 3. var, let, const

- `const` — cannot be reassigned. Object contents can still change.
- `let` — can be reassigned.
- `var` — old style, function-scoped, avoid it.
- Names: letters, digits, `_`, `$`; cannot start with a digit; case-sensitive; use `camelCase`.
- **Remember:** default to `const`. Use `let` only when you must reassign.

## 4. The 7 primitive types

```js
"text"          // string
42              // number
10n             // bigint
true            // boolean
undefined       // undefined
null            // null
Symbol("id")    // symbol
```

- Primitives are immutable values.
- Objects, arrays, functions, and dates are not primitives.
- **Remember:** `typeof null` returns `"object"` — this is an old bug, not the truth.

## 5. Objects vs primitives, reference vs value

- Primitives are copied **by value**:

```js
let a = 5;
let b = a;   // b gets its own copy
b = 10;      // a is still 5
```

- Objects are copied **by reference**:

```js
let a = { n: 1 };
let b = a;
b.n = 2;     // a.n is also 2
```

- **Remember:** changing an object through one variable changes it for every variable that points to it.

## 6. null vs undefined

- `undefined` — value not assigned or missing. JS gives it by default.
- `null` — intentionally empty. You set it yourself.
- `typeof undefined` → `"undefined"`. `typeof null` → `"object"`.
- **Remember:** `null == undefined` is `true`, but `null === undefined` is `false`.

## 7. Type coercion, == vs ===, truthy/falsy

- **Coercion** means converting one type to another.
- Implicit: JS does it. Explicit: you do it with `Number(x)`, `String(x)`, `Boolean(x)`.
- `===` checks value **and** type. `==` converts first, so avoid it.

```js
"5" == 5     // true
"5" === 5    // false
```

- **Falsy values:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
- Everything else is truthy — including `"0"`, `[]`, and `{}`.
- **Remember:** use `===` by default.

## 8. Operators

- Arithmetic: `+ - * / % **`
- Comparison: `> < >= <=`
- Logical: `&&` (and), `||` (or), `!` (not)
- Ternary: `condition ? a : b`
- Comma: evaluates left to right, returns the last value.

```js
let x = (1, 2, 3);   // x is 3
```

- `+` also joins strings. If one side is a string, the result is a string.
- **Remember:** `%` is remainder, `**` is power.

## 9. ?., ??, ??=, ||=, &amp;&amp;=

- `user?.address?.city` — returns `undefined` instead of crashing when something is null/undefined.
- `a ?? b` — uses `b` only when `a` is `null` or `undefined` (not when `a` is `0` or `""`).
- `a ??= b` — assigns `b` only when `a` is null/undefined.
- `a ||= b` — assigns `b` when `a` is falsy.
- `a &&= b` — assigns `b` only when `a` is truthy.
- **Remember:** for numbers and strings, `??` is safer than `||`.

## 10. typeof and instanceof

- `typeof` returns: `"string"`, `"number"`, `"boolean"`, `"undefined"`, `"object"`, `"function"`, `"symbol"`, `"bigint"`.
- `arr instanceof Array` checks the prototype chain.
- **Remember:** `typeof []` is `"object"`. Use `Array.isArray()` to check for arrays.

## 11. if/else and switch

```js
if (score >= 90) grade = "A";
else if (score >= 75) grade = "B";
else grade = "C";
```

```js
switch (day) {
  case "sat":
  case "sun":
    console.log("weekend");
    break;
  default:
    console.log("workday");
}
```

- `switch` uses strict equality.
- Missing `break` makes execution fall into the next case.
- **Remember:** `switch` for fixed values, `if` for ranges and conditions.

## 12. try/catch intro

```js
try {
  JSON.parse("{bad}");
} catch (err) {
  console.error(err.message);
} finally {
  console.log("always runs");
}
```

- `try` runs risky code.
- `catch` receives the error object.
- `finally` always runs, error or not.
- **Remember:** read `err.message` first.

## 13. Loops

- `for` — when you need an index.
- `while` — while a condition is true.
- `do...while` — runs at least once.
- `for...of` — values of arrays, strings, Maps, Sets.
- `for...in` — keys of objects.
- `break` exits the loop. `continue` skips to the next iteration.
- Labels let `break`/`continue` target an outer loop:

```
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
  }
}
```

- **Remember:** `for...of` for values, `for...in` for object keys.

## 14. Quick summary

- Default to `const`; use `let` only for reassignment; avoid `var`.
- Use `===` and memorise the falsy list.
- Primitives copy by value; objects copy by reference.
- `??` checks only null/undefined; `||` checks every falsy value.
- `for...of` = values, `for...in` = keys.
- Read an error from the message, then the line.

