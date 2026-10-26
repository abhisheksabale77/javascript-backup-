# A4 — Built-in Data Structures

**Time:** 1–2 weeks · **Priority:** `[B]` backend-critical

## Topics
- [ ] Strings: methods, template literals, tagged templates, Unicode/UTF-16
- [ ] Numbers: IEEE 754, `0.1+0.2`, precision pitfalls, `BigInt`
- [ ] `Math`, `parseInt`/`parseFloat`, `Number` methods
- [ ] `Date`: parsing, formatting, timezones, UTC pitfalls
- [ ] `Intl` (DateTimeFormat, NumberFormat); `Temporal` (upcoming) `[E]`
- [ ] Arrays: `map/filter/reduce/some/every/find/findLast/sort/flat/flatMap/at/slice/splice/fill/from/of`
- [ ] Mutating vs non-mutating methods; sort comparator rules
- [ ] `Map`, `Set`, `WeakMap`, `WeakSet` — when to use each
- [ ] `Symbol`, well-known symbols
- [ ] `ArrayBuffer`, `DataView`, typed arrays (binary data intro) `[E]`

## Examples
19 runnable files, numbered to match `NOTES.md`:
```bash
node examples\01-strings.js
# ... up to 19-binary-data.js
```

## Project
Build a **log/CSV parser**:
1. Create a sample `logs.csv` with columns: `timestamp,level,service,responseMs`.
2. Read it with `node:fs/promises`.
3. Parse each line safely (skip bad lines, collect errors).
4. Group by `service`, count requests, compute average `responseMs`.
5. Sort services by count (descending) and print a clean summary.
6. Handle dates with `Date`/`Intl` without timezone bugs.

## Done when
- [ ] You can explain why `0.1 + 0.2 !== 0.3` and how to compare floats
- [ ] You can choose `Map` vs object and `Set` vs array with a reason
- [ ] You can sort numbers and objects correctly
- [ ] You know which array methods mutate and which return copies
- [ ] Your parser handles bad lines without crashing
- [ ] Your date output is correct for the user's timezone
