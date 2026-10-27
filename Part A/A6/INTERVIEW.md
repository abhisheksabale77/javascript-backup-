# A6 — Interview Prep

## Q1. What is the difference between `/pattern/` and `new RegExp()`?
The literal is best for a fixed pattern. `new RegExp()` is useful when building a pattern from a variable; backslashes in its string need escaping.

## Q2. What do the `g`, `i`, `m`, and `s` flags do?
`g` finds multiple matches, `i` ignores case, `m` changes `^`/`$` to work per line, and `s` lets `.` match line breaks.

## Q3. What do `u`, `y`, `d`, and `v` do?
`u` enables Unicode code-point behavior, `y` makes matching sticky at `lastIndex`, `d` includes match indices, and `v` enables newer Unicode set operations. Check runtime support for newer flags.

## Q4. What is the difference between `\d`, `\w`, and `\s`?
They match digits, word characters, and whitespace. Uppercase versions (`\D`, `\W`, `\S`) match characters outside those sets.

## Q5. What do `^`, `$`, and `\b` match?
They match positions: start, end, and word boundaries. With `m`, `^` and `$` also match line boundaries.

## Q6. Greedy vs lazy quantifiers?
Greedy quantifiers take as much text as possible while still allowing a match. Lazy quantifiers (such as `*?`) take as little as possible.

## Q7. Capturing vs non-capturing groups?
`(...)` captures matched text for later use. `(?:...)` groups parts of a pattern without storing a capture.

## Q8. Why use named capture groups?
They make extracted fields clear and stable: `match.groups.year` is easier to read than `match[1]`.

## Q9. What are lookarounds?
Lookaheads and lookbehinds check text before or after a match without consuming it. Positive forms require the context; negative forms require it to be absent.

## Q10. What is a backreference?
A reference such as `\1` or `\k<name>` that matches the same text captured earlier in the pattern.

## Q11. Why can `/pattern/g.test(text)` give different answers on repeated calls?
Global regexes update `lastIndex`. Reset it to `0` before a new independent test, or remove `g` if it is not needed.

## Q12. Difference between `test` and `exec`?
`test` returns a boolean. `exec` returns match details and captures, or `null`.

## Q13. Difference between `match` and `matchAll`?
With `g`, `match` returns matched strings without capture details. `matchAll` returns an iterator of full match results and requires `g`.

## Q14. Difference between `replace` and `replaceAll`?
`replace` with a string pattern replaces the first occurrence. `replaceAll` replaces all literal occurrences; regex passed to it must have `g`.

## Q15. What can a replacement callback do?
It receives match text, captures, offset, input, and possibly named groups. It can compute a different replacement for each match.

## Q16. What is catastrophic backtracking?
A regex engine explores many possible paths when a pattern has ambiguous nested repetitions. Some crafted inputs can make matching take an extremely long time.

## Q17. What is ReDoS, and why is it serious in Node.js?
Regular Expression Denial of Service uses a slow regex to consume CPU. Regex matching is synchronous, so a bad match can block Node's event loop.

## Q18. How do you reduce regex risk for untrusted input?
Avoid nested ambiguous quantifiers, bound input length, keep patterns simple, and use a parser for complex nested formats.

## Common Mistakes
- Forgetting that `.` does not match newlines unless `s` is used.
- Using `^`/`$` without `m` when line-by-line matching is intended, or using `m` accidentally.
- Forgetting that `g` changes `lastIndex` for `test` and `exec`.
- Using `match` with `g` when capture groups are needed; use `matchAll`.
- Forgetting that `replace` only replaces the first string occurrence.
- Injecting user text into a `RegExp` without escaping it.
- Treating `\w` as all Unicode letters.
- Using nested ambiguous quantifiers on untrusted input.
