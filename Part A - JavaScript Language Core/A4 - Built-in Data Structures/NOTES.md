# A4 — Notes (Simple English, Deep Dive)

Each section has: **Quick idea → Deep dive → Gotchas → Remember**.

## 1. Strings
**Quick idea:** strings are immutable sequences of UTF-16 code units.

**Deep dive:**
- Every string method returns a **new** string; the original never changes.
- Common methods: `length`, `toUpperCase`, `toLowerCase`, `trim`, `includes`, `startsWith`, `endsWith`, `indexOf`, `slice`, `replace`, `replaceAll`, `split`, `padStart`, `padEnd`, `repeat`, `at`.
- `slice(start, end)` supports negative indexes. `substring(start, end)` treats negatives as `0` and swaps start/end if start > end.
- `charAt(i)` returns a code unit; `at(i)` supports negative indexes.
```js
const s = "  Hello  ";
console.log(s.trim());        // "Hello"
console.log(s.includes("ell")); // true
console.log("abc".slice(-2));   // "bc"
```

**Gotchas:**
- `length` counts code units, not visible characters (see section 3).
- `replace` with a string replaces only the first match — use `replaceAll` or a global regex.

**Remember:** strings never mutate; methods always produce a new string.

## 2. Template literals and tagged templates
**Quick idea:** backticks allow interpolation and multi-line strings.

**Deep dive:**
- `${expression}` inserts a value.
- Template literals keep line breaks.
- A **tagged template** calls a function with the string parts and the values:
```js
function tag(strings, ...values) {
  return strings.raw[0] + values.join("|");
}
console.log(tag`Hi ${"Aman"}!`); // "Hi Aman|!"
```
- The tag receives `strings` (array with a `.raw` property) and the evaluated values as separate arguments.
- `String.raw` keeps backslashes unchanged.

**Gotchas:**
- Tagged templates are not a security feature — never build SQL/HTML by concatenation, even with tags.
- Values are evaluated before the tag runs.

**Remember:** tagged templates give you control over interpolation.

## 3. Unicode and UTF-16
**Quick idea:** JavaScript strings are UTF-16. One visible character can use two code units.

**Deep dive:**
- `"😀".length` is `2` because it is a surrogate pair.
- `for...of` and spread iterate **code points**, so `[... "😀"]` has length `1`.
- `codePointAt(index)` returns the full code point; `String.fromCodePoint(n)` builds it back.
- Some accented characters have two forms: precomposed (`é`, U+00E9) and decomposed (`e` + combining accent).
- `normalize("NFC")` converts both forms to one canonical form.
```js
console.log("😀".length);        // 2
console.log([..."😀"].length);   // 1
console.log("é" === "e\u0301");  // false
console.log("é".normalize("NFC") === "e\u0301".normalize("NFC")); // true
```

**Gotchas:**
- `str[0]` can return half of a surrogate pair.
- Comparing user input without normalization can fail.

**Remember:** use spread/`for...of` for characters, and normalize before comparing.

## 4. Numbers and IEEE 754
**Quick idea:** JavaScript numbers are 64-bit floating-point values.

**Deep dive:**
- `0.1 + 0.2` is `0.30000000000000004` because decimals are stored in binary.
- Compare floats with a tolerance: `Math.abs(a - b) < Number.EPSILON`.
- `Number.MAX_SAFE_INTEGER` is `2^53 - 1` (`9007199254740991`). Larger integers lose precision.
- Useful checks: `Number.isInteger`, `Number.isFinite`, `Number.isNaN`, `Number.isSafeInteger`.
- `toFixed(n)` returns a **string** and has rounding quirks (`(1.005).toFixed(2)` is `"1.00"`).
- `-0` exists, but `-0 === 0` is `true`; `Object.is(-0, 0)` is `false`.
```js
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true
```

**Gotchas:**
- Do not use floats for money; store integer cents.
- `NaN !== NaN`; use `Number.isNaN`.

**Remember:** floats are approximate; compare with a tolerance, not `===`.

## 5. parseInt, parseFloat, and Number
**Quick idea:** `parseInt`/`parseFloat` parse a prefix; `Number` converts the whole value.

**Deep dive:**
- `parseInt("42px")` → `42`; it stops at the first invalid character.
- `parseInt("0x10", 16)` → `16`; always pass the radix.
- `parseFloat("3.14abc")` → `3.14`.
- `Number("42px")` → `NaN`; it requires the whole string to be valid.
- `Number("")` → `0`; `Number(" ")` → `0`; `Number(null)` → `0`; `Number(undefined)` → `NaN`.
- Unary `+x` behaves like `Number(x)`.
```js
console.log(parseInt("10px", 10)); // 10
console.log(Number("10px"));       // NaN
```

**Gotchas:**
- `parseInt` without a radix can surprise you with old-style octal strings.
- `Number("")` returning `0` hides empty input bugs.

**Remember:** `parseInt` = prefix parse; `Number` = strict whole-value conversion.

## 6. BigInt
**Quick idea:** `BigInt` stores arbitrarily large integers.

**Deep dive:**
- Literal syntax: `10n`; conversion: `BigInt("10")`.
- You cannot mix `BigInt` and `Number` in arithmetic: `1n + 1` throws.
- Division truncates toward zero: `7n / 2n` → `3n`.
- Comparisons work across types: `1n == 1` is `true`, `1n === 1` is `false`.
- `JSON.stringify` throws on `BigInt`.
```js
console.log(7n / 2n); // 3n
console.log(1n == 1); // true
```

**Gotchas:**
- Convert before JSON: `big.toString()`.
- `Math` methods do not work with `BigInt`.

**Remember:** BigInt is for exact large integers, not decimals.

## 7. Math
**Quick idea:** `Math` provides number helpers.

**Deep dive:**
- Rounding: `Math.round` (nearest), `Math.floor` (down), `Math.ceil` (up), `Math.trunc` (drop decimals).
- `Math.round(-1.5)` is `-1` because it rounds toward `+Infinity` on ties.
- `Math.min`/`Math.max` accept separate arguments; use spread for arrays.
- `Math.random()` returns `[0, 1)`, and it is **not** cryptographically secure.
- Random integer: `Math.floor(Math.random() * (max - min + 1)) + min`.
```js
console.log(Math.round(-1.5)); // -1
console.log(Math.trunc(-1.9)); // -1
```

**Gotchas:**
- `Math.random` is fine for games, not for tokens/passwords.
- `Math.min()` with no arguments returns `Infinity`.

**Remember:** floor/ceil/trunc differ on negatives.

## 8. Date basics
**Quick idea:** a `Date` stores milliseconds since 1970-01-01 UTC.

**Deep dive:**
- Create: `new Date()`, `new Date(ms)`, `new Date("2024-01-01T10:00:00Z")`.
- Local getters: `getFullYear`, `getMonth` (0-based), `getDate`, `getHours`.
- UTC getters: `getUTCFullYear`, `getUTCMonth`, `getUTCDate`, `getUTCHours`.
- Setters mutate the same object: `setFullYear`, `setMonth`, etc.
- `toISOString()` always returns UTC.
- Invalid dates have `getTime() === NaN`.
```js
const d = new Date("2024-01-15T10:30:00.000Z");
console.log(d.getUTCMonth()); // 0 (January)
console.log(d.toISOString()); // 2024-01-15T10:30:00.000Z
```

**Gotchas:**
- `getMonth()` starts at `0`; `getDate()` is the day of the month.
- Dates are mutable — copy with `new Date(d)` before changing.

**Remember:** local getters depend on the machine timezone; UTC getters do not.

## 9. Timezones and Intl
**Quick idea:** store/transmit UTC, display in a chosen timezone.

**Deep dive:**
- `new Date("2024-01-01")` (date-only ISO) is parsed as **UTC** midnight.
- `new Date("2024-01-01T00:00")` (no offset) is parsed as **local** time.
- That difference causes off-by-one-day bugs.
- `getTimezoneOffset()` returns the difference in minutes (UTC minus local).
- `Intl.DateTimeFormat` can format in any timezone:
```js
const fmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
});
console.log(fmt.format(new Date("2024-01-01T00:00:00Z")));
```
- `Temporal` is the modern replacement for `Date` but is not stable in current Node versions.

**Gotchas:**
- The server timezone may differ from the user's timezone.
- Formatting is locale/ICU dependent — do not assert exact strings in tests.

**Remember:** store UTC, format with `Intl` + explicit `timeZone`.

## 10. Arrays: creation and basics
**Quick idea:** arrays are ordered, resizable lists.

**Deep dive:**
- `[]` is the normal literal.
- `Array(3)` creates a length-3 array with **holes**.
- `Array.of(3)` creates `[3]`.
- `Array.from(arrayLike, mapFn)` converts iterables/array-likes and can map while doing it.
- `Array.isArray(x)` is the reliable array check.
- `arr.length` is writable: increasing adds holes, decreasing truncates.
```js
console.log(Array.of(3));       // [ 3 ]
console.log(Array(3).length);   // 3
console.log(Array.from("abc")); // [ 'a', 'b', 'c' ]
```

**Gotchas:**
- `map`/`forEach` skip holes; spread converts holes to `undefined`.
- `typeof []` is `"object"`.

**Remember:** `Array(n)` is not "an array containing n".

## 11. Array iteration methods
**Quick idea:** each method has a specific purpose and return value.

**Deep dive:**
- `map` returns a new array of the same length.
- `filter` returns a shorter array of matching items.
- `reduce` folds to one value; always pass an initial value.
- `some` returns `true` if any item matches; `every` requires all.
- `find`/`findLast` return the item; `findIndex`/`findLastIndex` return the index.
- `forEach` returns `undefined` and cannot be stopped with `break`.
- Callbacks receive `(value, index, array)`.
```js
const nums = [1, 2, 3, 4];
console.log(nums.reduce((sum, n) => sum + n, 0)); // 10
```

**Gotchas:**
- `map` + `filter` creates intermediate arrays; a single loop is sometimes clearer/faster.
- `some`/`every` short-circuit; `forEach` does not.

**Remember:** choose by return value: array (`map/filter`), boolean (`some/every`), item (`find`), single value (`reduce`).

## 12. Array transform methods
**Quick idea:** slice copies, splice cuts, flat flattens, at indexes from the end.

**Deep dive:**
- `slice(start, end)` returns a copy; negatives count from the end.
- `splice(start, deleteCount, ...items)` mutates the array and returns removed items.
- `concat` joins arrays without mutating.
- `flat(depth)` flattens nested arrays; `flatMap` maps then flattens one level.
- `at(-1)` returns the last item.
- `join(sep)` turns items into a string.
```js
const arr = [1, 2, 3, 4];
console.log(arr.slice(1, 3));  // [ 2, 3 ]
console.log(arr.splice(1, 2)); // [ 2, 3 ]
console.log(arr);              // [ 1, 4 ]
```

**Gotchas:**
- `splice` changes the original array; `slice` does not.
- `flat` does not remove holes the way you might expect.

**Remember:** slice = copy, splice = surgery.

## 13. Mutating vs non-mutating arrays
**Quick idea:** know which methods change the original array.

**Deep dive:**
- **Mutating:** `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`.
- **Non-mutating:** `slice`, `concat`, `map`, `filter`, `flat`, `flatMap`, `join`, `includes`.
- ES2023 adds copy versions: `toSorted`, `toReversed`, `toSpliced`, and `with(index, value)`.
- `structuredClone(arr)` deep-copies nested data.
```js
const a = [3, 1, 2];
const b = a.toSorted((x, y) => x - y);
console.log(a); // [ 3, 1, 2 ]
console.log(b); // [ 1, 2, 3 ]
```

**Gotchas:**
- Passing an array to a function does not copy it — mutations leak.
- `sort` and `reverse` mutate in place.

**Remember:** prefer non-mutating methods unless mutation is intended.

## 14. sort comparator rules
**Quick idea:** without a comparator, `sort` converts items to strings.

**Deep dive:**
- Default sort: `[10, 9, 1].sort()` → `[1, 10, 9]`.
- Numeric ascending: `(a, b) => a - b`.
- Numeric descending: `(a, b) => b - a`.
- The comparator must return a negative number, zero, or a positive number.
- Sort is **stable** since ES2019: equal items keep their original order.
- To sort objects: `(a, b) => a.age - b.age`.
```js
console.log([10, 9, 1].sort((a, b) => a - b)); // [ 1, 9, 10 ]
```

**Gotchas:**
- `(a, b) => a > b` returns a boolean, which is not a valid comparator.
- An inconsistent comparator gives unpredictable order.

**Remember:** always pass a comparator for numbers and objects.

## 15. Map
**Quick idea:** a key-value collection that accepts any key type.

**Deep dive:**
- Keys can be strings, numbers, objects, functions — anything.
- Preserves insertion order.
- Methods: `set`, `get`, `has`, `delete`, `clear`, `size`.
- Iteration: `keys()`, `values()`, `entries()`, `forEach`, `for...of`.
- A plain object stringifies object keys (`obj[key]` becomes `"[object Object]"`).
- `Object.fromEntries(map)` converts a Map to an object (keys become strings).
- `new Map(Object.entries(obj))` converts an object to a Map.
```js
const map = new Map();
map.set("a", 1);
map.set({ id: 1 }, "object key");
console.log(map.get("a")); // 1
```

**Gotchas:**
- `JSON.stringify(new Map())` gives `{}`.
- Object keys are compared by reference, not by content.

**Remember:** Map for dynamic keys and guaranteed order; object for fixed record shapes.

## 16. Set
**Quick idea:** a collection of unique values.

**Deep dive:**
- Duplicates are removed using **SameValueZero**: `NaN` equals `NaN`, and `+0` equals `-0`.
- Methods: `add`, `has`, `delete`, `clear`, `size`.
- Iteration keeps insertion order.
- Deduplicate an array: `[...new Set(arr)]`.
- Newer runtimes (Node 22+) add set operations: `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`.
```js
const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [ 1, 2, 3 ]
```

**Gotchas:**
- Objects are compared by reference, so two equal-looking objects are different set members.
- Set has no index access — convert to an array with `[...set]`.

**Remember:** Set = uniqueness; array = order + indexes.

## 17. WeakMap and WeakSet
**Quick idea:** collections that hold objects weakly, so they do not block garbage collection.

**Deep dive:**
- `WeakMap` keys must be objects; `WeakSet` values must be objects.
- They have no `size`, no iteration, and no `clear`.
- If nothing else references the key object, the entry can be garbage-collected.
- Use cases: private data per object, caches keyed by object, tracking visited nodes.
```js
const cache = new WeakMap();
const user = { id: 1 };
cache.set(user, "data");
console.log(cache.get(user)); // data
```

**Gotchas:**
- You cannot list entries, so debugging is harder.
- Primitive keys throw.

**Remember:** WeakMap/WeakSet prevent memory leaks tied to object lifetimes.

## 18. Symbol
**Quick idea:** `Symbol` creates a unique, non-string property key.

**Deep dive:**
- Every `Symbol()` call is unique, even with the same description.
- `Symbol.for("key")` uses a global registry; `Symbol.keyFor(sym)` reads it back.
- Symbol keys are skipped by `Object.keys` and `JSON.stringify`, but `Reflect.ownKeys` shows them.
- Well-known symbols let you customise language behaviour: `Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`, `Symbol.toStringTag`.
```js
const id = Symbol("id");
const user = { name: "Aman", [id]: 1 };
console.log(Object.keys(user));      // [ 'name' ]
console.log(Reflect.ownKeys(user));  // [ 'name', Symbol(id) ]
```

**Gotchas:**
- Two symbols with the same description are not equal.
- Symbol properties are not serialized by JSON.

**Remember:** Symbols are for unique keys and protocol hooks, not privacy.

## 19. Binary data: ArrayBuffer, DataView, typed arrays
**Quick idea:** `ArrayBuffer` is raw bytes; typed arrays and `DataView` are ways to read them.

**Deep dive:**
- `new ArrayBuffer(8)` allocates 8 bytes.
- `Uint8Array`, `Int16Array`, `Float64Array`, etc. are typed **views** over the buffer.
- A typed array's `length` is the number of elements; `byteLength` is bytes.
- `DataView` gives exact control over byte order (endianness).
- Node's `Buffer` is a subclass of `Uint8Array`.
```js
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
view.setUint16(0, 0x1234);
console.log(view.getUint16(0).toString(16)); // 1234
console.log(view.getUint16(0, true).toString(16)); // 3412 (little-endian)
```

**Gotchas:**
- Multiple views share the same buffer — writes are visible to all.
- Endianness matters when talking to files or networks.

**Remember:** ArrayBuffer = bytes; typed array = typed window; DataView = manual byte control.

## 20. Quick summary
- Strings are immutable UTF-16; normalize before comparing accents.
- Floats are approximate; use tolerance and integer cents for money.
- `parseInt` parses prefixes; `Number` converts whole values.
- Store dates as UTC; format with `Intl` and an explicit timezone.
- `slice` copies, `splice` mutates; `sort` needs a comparator.
- `Map` = any keys + order; object = fixed record shape.
- `Set` = unique values; `WeakMap`/`WeakSet` = object-keyed, GC-friendly.
- `Symbol` = unique keys and protocol hooks.
- Typed arrays and `DataView` work on raw bytes.
