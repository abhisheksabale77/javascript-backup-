# A5 — Iterators & Generators

**Time:** 1 week · **Priority:** `[B]` backend-critical

## Topics
- [ ] Iterable and iterator protocols; how `for...of` works
- [ ] Generators: `function*`, `yield`, `yield*`, lazy evaluation
- [ ] Async generators, `for await...of`
- [ ] Iterator helpers (`map`/`filter`/`take`/`drop`) `[E]`

## Examples
11 runnable files, numbered by topic:
```bash
node examples\01-iterator-protocol.js
# ... up to 11-iterator-helpers.js
```

## Project
Build both:
1. A **paginator generator** that takes an array and page size, then yields one page at a time.
2. An **async generator** that reads a text file in chunks and yields each chunk. Consume it with `for await...of`.

## Done when
- [ ] You can explain the iterable and iterator protocols
- [ ] You can build a custom iterable and a generator
- [ ] You understand `yield`, `yield*`, `.next(value)`, `.return()`, and `.throw()`
- [ ] You can consume an async iterable with `for await...of`
- [ ] You can explain why generators are lazy and one-shot
