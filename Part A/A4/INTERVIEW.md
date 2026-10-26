# A4 — Interview Prep

## Q1. Are JavaScript strings mutable?
No. Strings are immutable. Methods like `toUpperCase` return a new string; the original never changes.

## Q2. Difference between `slice` and `substring`?
Both extract part of a string. `slice` accepts negative indexes; `substring` treats negatives as `0` and swaps arguments when start > end.

## Q3. What are tagged templates?
A function called with a template literal. It receives the static string parts and the interpolated values separately, so it can process them before joining.

## Q4. Why is `"😀".length` equal to 2?
JavaScript strings are UTF-16. The emoji is a surrogate pair made of two code units. Spread or `for...of` counts code points instead, giving length 1.

## Q5. Why is `0.1 + 0.2 !== 0.3`? How do you compare floats?
Numbers are 64-bit binary floats, and decimal fractions cannot be represented exactly. Compare with a tolerance: `Math.abs(a - b) < Number.EPSILON`.

## Q6. What is `Number.MAX_SAFE_INTEGER`? When do you use `BigInt`?
It is `2^53 - 1`, the largest integer that can be represented exactly. Use `BigInt` for larger integers, but you cannot mix it with `Number` in arithmetic.

## Q7. Difference between `parseInt` and `Number`?
`parseInt` parses a prefix and stops at the first invalid character (`"42px"` → 42). `Number` requires the whole value to be valid (`"42px"` → `NaN`).

## Q8. Difference between `Math.round`, `Math.floor`, `Math.ceil`, and `Math.trunc`?
`round` goes to the nearest integer, `floor` always goes down, `ceil` always goes up, and `trunc` drops the decimal part. They differ on negative numbers.

## Q9. How does a `Date` store time? Local vs UTC getters?
A `Date` stores milliseconds since the Unix epoch in UTC. Local getters (`getHours`) convert to the machine timezone; UTC getters (`getUTCHours`) do not.

## Q10. Why can `new Date("2024-01-01")` show the wrong day?
Date-only ISO strings are parsed as UTC midnight. In timezones behind UTC, the local date is the previous day. Date-time strings without an offset are parsed as local time.

## Q11. How do you format a date in another timezone?
Use `Intl.DateTimeFormat` with an explicit `timeZone` option, for example `{ timeZone: "Asia/Kolkata" }`.

## Q12. Difference between `Array.from`, `Array.of`, and `new Array(n)`?
`Array.from` converts an iterable/array-like to an array. `Array.of` creates an array from the given arguments. `new Array(n)` creates an array of length `n` with holes.

## Q13. Difference between `map` and `forEach`?
`map` returns a new array of transformed values. `forEach` returns `undefined` and is only for side effects; it cannot be stopped early.

## Q14. Difference between `some`, `every`, `find`, and `filter`?
`some` returns a boolean if any item matches; `every` if all match. `find` returns the first matching item; `filter` returns all matching items in a new array.

## Q15. Difference between `slice` and `splice`?
`slice` returns a copy and does not change the original. `splice` mutates the original and returns the removed items.

## Q16. How does `sort` work by default? Is it stable?
By default, `sort` converts items to strings and sorts lexicographically. Since ES2019 it is stable: equal items keep their original order.

## Q17. Which array methods mutate? Which return copies?
Mutating: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`. Copying: `slice`, `concat`, `map`, `filter`, `flat`, `flatMap`, `toSorted`, `toReversed`, `toSpliced`, `with`.

## Q18. `Map` vs plain object — when do you use each?
Use `Map` for dynamic keys of any type, guaranteed insertion order, frequent additions/deletions, and a reliable `size`. Use an object for fixed record shapes and JSON data.

## Q19. `Set` vs array? How do you deduplicate?
A `Set` stores unique values and has fast `has`; an array keeps order and indexes and allows duplicates. Deduplicate with `[...new Set(arr)]`.

## Q20. `WeakMap`/`WeakSet` vs `Map`/`Set`?
Weak versions hold object keys/values weakly so they can be garbage-collected. They have no `size`, iteration, or `clear`. Use them for caches or private data keyed by objects.

## Q21. What is a `Symbol`? What are well-known symbols?
A `Symbol` is a unique primitive used as a property key. Well-known symbols customise language behaviour: `Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`, `Symbol.toStringTag`.

## Q22. `ArrayBuffer`, typed arrays, and `DataView` — what is the difference?
`ArrayBuffer` is raw bytes. Typed arrays (`Uint8Array`, `Float64Array`, ...) are typed views over those bytes. `DataView` reads/writes bytes with explicit types and endianness.

## Common Mistakes
- Using `==` to compare floats and expecting exact equality.
- Calling `parseInt` without a radix.
- Using `Number("")` and treating it as invalid input (it returns `0`).
- Mixing `BigInt` and `Number` in arithmetic.
- Mutating a `Date` while expecting the original to stay the same.
- Parsing date-only strings and ignoring UTC vs local time.
- Using `sort()` on numbers without a comparator.
- Thinking `splice` returns the remaining array — it returns the removed items.
- Using an object as a key in a plain object (it becomes `"[object Object]"`).
- Trying to `JSON.stringify` a `Map`, `Set`, or `BigInt` and expecting valid output.
- Comparing strings with accents without `normalize`.
- Treating `Symbol` keys as private data — they are hidden from `Object.keys`, not from `Reflect.ownKeys`.
