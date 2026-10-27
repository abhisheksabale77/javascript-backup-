# A6 — Regular Expressions

**Time:** 1 week · **Priority:** `[B]` backend-critical

## Topics
- [ ] Regex literals vs `RegExp` constructor; escaping
- [ ] Flags: `g`, `i`, `m`, `s`, `u`, `y`, `d`, `v`
- [ ] Character classes, anchors, quantifiers, groups, named groups
- [ ] Lookahead/lookbehind and backreferences
- [ ] `test`, `exec`, `match`, `matchAll`, `replace`, `replaceAll`, `search`, `split`
- [ ] Greedy vs lazy matching
- [ ] Catastrophic backtracking and ReDoS awareness

## Examples
12 runnable files, numbered by topic:
```bash
node examples\01-literals-and-constructor.js
# ... up to 12-redos-safety.js
```

## Project
Build a **log-line parser**:
1. Parse lines like `2026-10-27T12:30:00Z ERROR api request failed user=42`.
2. Extract timestamp, level, service, message, and optional user ID with named groups.
3. Count errors by service and redact email addresses from messages.
4. Reject malformed lines cleanly.
5. Test normal, empty, malformed, and long input without using a risky backtracking pattern.

## Done when
- [ ] You can read a regex aloud and explain each part
- [ ] You know when `g`/`y` makes `test` and `exec` stateful
- [ ] You can extract fields with named groups and replace with a callback
- [ ] You can explain greedy vs lazy matching and lookaround
- [ ] You can identify and avoid a likely ReDoS pattern
