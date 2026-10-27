# A6 — Notes (Simple English, Deep Dive)

Each section has: **Quick idea → Deep dive → Gotchas → Remember**.

## 1. Regex literal vs `RegExp` constructor
**Quick idea:** a regular expression describes a text pattern.

**Deep dive:**
- Literal: `/cat/i` — concise, parsed when the code loads.
- Constructor: `new RegExp(pattern, flags)` — useful when the pattern is built from a variable.
- In a string passed to `RegExp`, backslashes need escaping: `new RegExp("\\d+")` creates `/\d+/`.
```js
const word = "cat";
const pattern = new RegExp(`\\b${word}\\b`, "i");
console.log(pattern.test("A CAT!")); // true
```

**Gotchas:**
- User input inserted into a pattern may contain regex characters. Escape it if you mean literal text.
- A regex is not a full parser for nested languages such as arbitrary HTML.

**Remember:** literal for fixed patterns; constructor for dynamic patterns.

## 2. Flags and `lastIndex`
**Quick idea:** flags change how matching works.

**Deep dive:**
- `g` global (find more than one); `i` case-insensitive; `m` multiline anchors; `s` dot matches newlines.
- `u` Unicode code-point mode; `y` sticky (match exactly at `lastIndex`); `d` includes match indices.
- `v` enables newer Unicode set operations; availability depends on the runtime.
- Global and sticky regexes update `lastIndex`, so repeated `test`/`exec` calls continue from the previous match.
```js
const re = /a/g;
console.log(re.test("a")); // true
console.log(re.test("a")); // false (lastIndex is now at the end)
re.lastIndex = 0;
```

**Gotchas:**
- Reusing a global regex in validation can alternate true/false unexpectedly.
- `m` changes `^` and `$`; it does not make `.` match newlines (`s` does that).

**Remember:** reset `lastIndex` when reusing a global or sticky regex for a fresh test.

## 3. Character classes
**Quick idea:** character classes match one character from a set.

**Deep dive:**
- `[abc]` matches `a`, `b`, or `c`; `[a-z]` matches a range.
- `[^abc]` matches any character except those listed.
- Shorthand: `\d` digit, `\w` word character, `\s` whitespace; uppercase forms negate them (`\D`, `\W`, `\S`).
- Escape special characters when they should be literal: `\.`, `\[`, `\\`.
```js
console.log(/[A-Z]\d/.test("B7")); // true
console.log(/[^0-9]/.test("7")); // false
```

**Gotchas:**
- `\w` is mostly ASCII letters, digits, and `_`; it is not every letter in every language.
- Inside `[]`, many characters have different rules than outside.

**Remember:** a character class usually consumes exactly one character.

## 4. Anchors and boundaries
**Quick idea:** anchors match a position, not a character.

**Deep dive:**
- `^` start of input; `$` end of input. With `m`, they also match line starts/ends.
- `\b` word boundary; `\B` not a word boundary.
- To validate a whole string, anchor both ends: `/^...$/` (with care around final newlines).
```js
console.log(/^cat$/.test("cat")); // true
console.log(/^cat$/.test("a cat")); // false
console.log(/\bcat\b/i.test("a cat!")); // true
```

**Gotchas:**
- Without anchors, `.test()` can succeed on a substring inside a larger string.
- In multiline mode, `^`/`$` match line boundaries, not only the entire input.

**Remember:** use anchors when the entire value must match.

## 5. Quantifiers; greedy vs lazy
**Quick idea:** quantifiers say how many times a pattern may repeat.

**Deep dive:**
- `*` zero or more; `+` one or more; `?` zero or one; `{n}`, `{n,}`, `{n,m}` set counts.
- Greedy quantifiers take as much text as possible, then backtrack if needed.
- Add `?` to make a quantifier lazy: `*?`, `+?`, `??`, `{n,m}?`.
```js
console.log("<a><b>".match(/<.*>/)[0]); // <a><b> (greedy)
console.log("<a><b>".match(/<.*?>/)[0]); // <a> (lazy)
```

**Gotchas:**
- Lazy does not mean efficient or correct; it only changes which match is preferred.
- Nested repeating groups can cause catastrophic backtracking (section 12).

**Remember:** greedy = longest workable match; lazy = shortest workable match.

## 6. Capturing, non-capturing, and named groups
**Quick idea:** groups collect or organize parts of a match.

**Deep dive:**
- `(\d{4})-(\d{2})` captures groups by number (`1`, `2`).
- `(?:...)` groups without capturing.
- `(?<year>\d{4})` creates a named group; access it through `groups.year`.
- Groups are useful for extracting structured text.
```js
const m = "2026-10".match(/(?<year>\d{4})-(?<month>\d{2})/);
console.log(m.groups.year, m.groups.month); // 2026 10
```

**Gotchas:**
- Adding a capturing group can change the numeric indexes used by existing code.
- Prefer named groups when the pattern has several fields.

**Remember:** use `(?:...)` when grouping is needed but the value is not.

## 7. Lookahead and lookbehind
**Quick idea:** lookarounds check nearby text without consuming it.

**Deep dive:**
- `x(?=y)` positive lookahead: match `x` only if followed by `y`.
- `x(?!y)` negative lookahead: match `x` only if not followed by `y`.
- `(?<=y)x` positive lookbehind: match `x` only if preceded by `y`.
- `(?<!y)x` negative lookbehind: match `x` only if not preceded by `y`.
```js
console.log("file.js".match(/\w+(?=\.js)/)[0]); // file
console.log("$42".match(/(?<=\$)\d+/)[0]); // 42
```

**Gotchas:**
- Lookarounds can make patterns hard to understand; explain or comment on complex ones.
- Lookbehind support is modern, but check old runtime requirements if needed.

**Remember:** lookarounds assert context; they do not include it in the match.

## 8. Backreferences
**Quick idea:** a backreference matches the same text as an earlier capture.

**Deep dive:**
- `\1` refers to capture group 1; named form is `\k<name>`.
- Useful for repeated delimiters or detecting repeated words.
```js
console.log(/(["']).*?\1/.test("'hello'")); // true
console.log(/\b(?<word>\w+)\s+\k<word>\b/i.test("go go")); // true
```

**Gotchas:**
- Backreferences can make a regex harder to reason about and may increase backtracking.
- In a string passed to `RegExp`, backslashes need another escape layer.

**Remember:** a backreference means “match the exact text this group captured.”

## 9. `test`, `exec`, and state
**Quick idea:** `test` answers yes/no; `exec` returns match details.

**Deep dive:**
- `re.test(text)` returns a boolean.
- `re.exec(text)` returns match text, index, captures, and named groups, or `null`.
- With `g` or `y`, both use and update `lastIndex`.
- `y` sticky requires the next match to start exactly at `lastIndex`.
```js
const re = /\d+/g;
console.log(re.exec("id=42")[0]); // 42
console.log(re.exec("id=42")); // null (search starts at the end)
```

**Gotchas:**
- Do not share one global regex across unrelated validation calls without resetting it.
- `exec` returns an array-like match object, not just the matched string.

**Remember:** global/sticky regexes keep state in `lastIndex`.

## 10. `match`, `matchAll`, `search`, and `split`
**Quick idea:** string methods provide different ways to find or divide text.

**Deep dive:**
- `text.match(re)` with `g` returns all matched strings; without `g`, it returns the first match plus captures.
- `text.matchAll(re)` returns an iterator of full match results and requires `g`.
- `text.search(re)` returns the first index or `-1`.
- `text.split(re)` divides text around matches.
```js
console.log("a1 b2".match(/\d/g)); // [ '1', '2' ]
console.log([..."a1 b2".matchAll(/(?<n>\d)/g)].map((m) => m.groups.n)); // [ '1', '2' ]
```

**Gotchas:**
- `matchAll` is lazy; spread it or loop over it to read results.
- `match` changes shape depending on whether the regex has `g`.

**Remember:** use `matchAll` when you need every match and its captures.

## 11. `replace` and `replaceAll`
**Quick idea:** replace matched text with a string or callback result.

**Deep dive:**
- `replace` with a string pattern replaces the first occurrence; `replaceAll` replaces every literal occurrence.
- A regex with `g` replaces every match.
- A callback receives the match, captures, offset, input, and (for named groups) a groups object.
- Replacement tokens include `$&` (whole match), `$1` (capture 1), and `$<name>` (named capture).
```js
const text = "user=42";
console.log(text.replace(/(?<key>\w+)=(?<value>\d+)/, "$<key>:$<value>")); // user:42
```

**Gotchas:**
- `replaceAll` with a regex requires the global `g` flag.
- Callback argument positions differ when captures and named groups are present; use the final groups argument carefully.

**Remember:** use a callback when replacement depends on captured values.

## 12. ReDoS and safer patterns
**Quick idea:** some patterns take extremely long on crafted input.

**Deep dive:**
- Catastrophic backtracking happens when many alternative paths are retried.
- Risky shape: nested ambiguous repetition such as `^(a+)+$` against a long run of `a` followed by `!`.
- Prefer simple, bounded patterns; avoid nested overlapping quantifiers.
- Limit input length before matching untrusted text; use a parser for complex formats.
- JavaScript regex has no built-in timeout, so a risky match can block the event loop.

**Gotchas:**
- A pattern that is fast for normal input may be slow for adversarial input.
- Do not run a known catastrophic pattern on a long string just to test it.

**Remember:** regex work is synchronous; ReDoS can block the whole Node process.
