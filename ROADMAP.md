# Complete JavaScript → Backend Roadmap (Beginner → Expert)

**Legend:** `[B]` backend-critical · `[F]` browser/frontend · `[E]` expert/optional

**Pace:** 1–2h/day. Total ≈ 8–10 months. Each phase ends with a project — no project, no progression.

---

## Part A — JavaScript Language Core

### A0. Setup &amp; Tools (3–5 days)

- [ ] Editor (VS Code), Node.js LTS, npm, terminal basics
- [ ] Run JS three ways: `node file.js`, browser console, `<script>` tag
- [ ] Git basics: init, add, commit, log
- [ ] Chrome DevTools: console, sources, breakpoints
- [ ] Read stack traces, `console.log/warn/error/table`

- **Project:** debug 5 broken scripts

### A1. Fundamentals (1–2 weeks) `[B]`

- [ ] Syntax, statements vs expressions, ASI, comments
- [ ] Variables: `var`/`let`/`const`, naming rules
- [ ] Primitive types: string, number, bigint, boolean, undefined, null, symbol
- [ ] Objects vs primitives, reference vs value
- [ ] Type coercion, `==` vs `===`, truthy/falsy, `null` vs `undefined`
- [ ] Operators: arithmetic, comparison, logical (`&&`, `||`, `??`), ternary, comma
- [ ] `typeof`, `instanceof`, optional chaining `?.`, nullish assignment `??=`, logical assignment
- [ ] Control flow: `if/else`, `switch`, `try/catch` intro
- [ ] Loops: `for`, `while`, `do...while`, `for...in`, `for...of`, `break`/`continue`, labels

- **Project:** CLI calculator + FizzBuzz + type-coercion quiz
- **Done when:** you can predict any coercion puzzle output

### A2. Functions &amp; Scope (2 weeks) `[B]`

- [ ] Declarations, expressions, arrow functions; hoisting differences
- [ ] Parameters: default, rest, `arguments`, destructured params
- [ ] Return values, early returns, pure vs impure functions
- [ ] Scope: global, function, block; lexical scope; scope chain
- [ ] Closures: private state, factories, memoization, closure leaks
- [ ] IIFE
- [ ] Recursion; why V8 has no tail-call optimization
- [ ] Higher-order functions, callbacks
- [ ] Currying, partial application, `compose`, `pipe`
- [ ] `this`: 4 binding rules, arrow `this`, `call`/`apply`/`bind`

- **Project:** utility library — `debounce`, `throttle`, `once`, `memoize`, `curry` + event emitter

### A3. Objects, Prototypes, Classes (2 weeks) `[B]`

- [ ] Object literals, computed keys, shorthand, methods
- [ ] Property access, `delete`, `in`, optional chaining
- [ ] Property descriptors: writable/enumerable/configurable
- [ ] `Object.defineProperty`, `freeze`, `seal`, `preventExtensions`
- [ ] Getters and setters
- [ ] `Object.keys/values/entries/fromEntries/assign/create/getPrototypeOf/hasOwn`
- [ ] Spread/rest for objects, shallow vs deep copy, `structuredClone`
- [ ] Prototype chain, `__proto__`, `Object.create`, constructor property
- [ ] Classes: constructor, methods, `static`, private `#fields`, static blocks
- [ ] Inheritance: `extends`, `super`, `instanceof`, mixins
- [ ] Composition over inheritance
- [ ] JSON: `parse`/`stringify`, replacer/reviver, edge cases

- **Project:** class hierarchy (custom errors) + custom collection class

### A4. Built-in Data Structures (1–2 weeks) `[B]`

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

- **Project:** log/CSV parser with grouping and aggregation

### A5. Iterators &amp; Generators (1 week) `[B]`

- [ ] Iterable and iterator protocols; how `for...of` works
- [ ] Generators: `function*`, `yield`, `yield*`, lazy evaluation
- [ ] Async generators, `for await...of`
- [ ] Iterator helpers: `map/filter/take/drop` `[E]`

- **Project:** paginator generator + async generator reading file chunks

### A6. Regular Expressions (1 week) `[B]`

- [ ] Literals vs `RegExp` constructor; flags `g i m s u y d v`
- [ ] Character classes, anchors, quantifiers, groups, named groups, backreferences
- [ ] Lookahead / lookbehind
- [ ] `test`, `exec`, `match`, `matchAll`, `replace`, `replaceAll`, `split`
- [ ] Catastrophic backtracking / ReDoS awareness

- **Project:** email/URL validator + log parser

### A7. Errors, Debugging, Quality (1 week) `[B]`

- [ ] Error types, `throw`, `try/catch/finally`
- [ ] Custom errors, `cause`, `AggregateError`
- [ ] Async error propagation
- [ ] `node --inspect`, breakpoints, stack trace reading
- [ ] Strict mode
- [ ] ESLint + Prettier

- **Project:** refactor an old project with custom errors and zero lint warnings

---

## Part B — Async JavaScript &amp; Runtime

### B1. Event Loop &amp; Runtime (1 week) `[B]`

- [ ] Call stack, heap, queues
- [ ] Macrotasks vs microtasks; exact execution order
- [ ] `setTimeout`/`setInterval` ordering and clamping
- [ ] Node event loop phases: timers, poll, check, close
- [ ] `process.nextTick`, `setImmediate`
- [ ] Blocking vs non-blocking code; CPU-bound work

- **Project:** predict ordering exercises; fix a blocking script

### B2. Promises (1–2 weeks) `[B]`

- [ ] States, `then`/`catch`/`finally`, chaining, returning promises
- [ ] `Promise.all`, `allSettled`, `race`, `any`
- [ ] Promisification, `Promise.withResolvers` `[E]`
- [ ] Unhandled rejections

- **Project:** promise-based HTTP wrapper with retries

### B3. async/await (1 week) `[B]`

- [ ] Syntax, sequential vs parallel, error handling
- [ ] `for await...of`, top-level await (ESM)
- [ ] Cancellation: `AbortController`/`AbortSignal`, timeouts
- [ ] Pitfalls: missing `await`, `forEach` with async, zalgo

- **Project:** concurrent task runner with concurrency limit, retry, timeout

### B4. Modules (1 week) `[B]`

- [ ] Script vs module
- [ ] ESM: import/export, default vs named, re-exports, dynamic `import()`
- [ ] CommonJS: `require`, `module.exports`, interop
- [ ] Circular dependencies
- [ ] `package.json` `type`, `import.meta`
- [ ] Bundlers overview (Vite/esbuild) — concepts only `[F]`

- **Project:** same multi-file CLI built in ESM and CJS

---

## Part C — Browser JavaScript (complete, optional for backend)

### C1. DOM (2 weeks) `[F]`

- [ ] `document`, selecting, traversal
- [ ] Create/insert/remove/clone nodes
- [ ] Attributes vs properties, `dataset`, classes, inline styles
- [ ] `textContent` vs `innerHTML`; XSS awareness
- [ ] Forms, inputs, validation
- [ ] Events: bubbling/capturing, delegation, `preventDefault`, custom events, event object

- **Project:** todo app with DOM + localStorage

### C2. Browser APIs (2 weeks) `[F]`

- [ ] BOM: `window`, `location`, `history`, `navigator`, `screen`
- [ ] Storage: localStorage, sessionStorage, cookies, IndexedDB
- [ ] `fetch`, `Request`/`Response`, headers, CORS, `AbortController`
- [ ] File API, Blob, FileReader, drag &amp; drop
- [ ] Clipboard, Notifications, Geolocation
- [ ] Observers: Intersection, Resize, Mutation
- [ ] Canvas 2D basics, SVG overview
- [ ] Web Components: custom elements, shadow DOM, templates
- [ ] Web Workers, Service Workers (concepts)
- [ ] WebSocket, Server-Sent Events, WebRTC overview

- **Project:** dashboard using fetch + observers + storage

### C3. Browser Runtime (1 week) `[F]`

- [ ] Rendering pipeline, reflow/repaint, performance profiling
- [ ] Browser memory leaks
- [ ] Same-origin policy, CORS, CSP, XSS/CSRF basics

- **Project:** performance audit of the C1/C2 app

---

## Part D — Node.js &amp; Backend

### D1. Node Core (2–3 weeks) `[B]`

- [ ] Runtime: V8, libuv, REPL
- [ ] `process`: argv, env, exit codes, signals
- [ ] `fs/promises`, `path`, `os`
- [ ] Buffers, streams (readable/writable/transform/pipeline), backpressure
- [ ] `EventEmitter`
- [ ] `http` module: server without a framework
- [ ] `worker_threads`, `child_process`, `cluster` overview

- **Project:** static file server + CLI file organizer

### D2. HTTP &amp; APIs (2–3 weeks) `[B]`

- [ ] HTTP methods, status codes, headers, cookies
- [ ] REST design, idempotency, pagination, versioning
- [ ] Express or Fastify: routing, middleware, error handling, validation
- [ ] curl/Postman, OpenAPI overview

- **Project:** CRUD REST API with validation and clean errors

### D3. Databases (3–4 weeks) `[B]`

- [ ] SQL: schema design, relations, joins, indexes, transactions, migrations
- [ ] PostgreSQL with `pg` or Prisma
- [ ] NoSQL overview: MongoDB basics, when to use
- [ ] Redis: caching, key design
- [ ] N+1 problem, SQL injection, connection pooling

- **Project:** API backed by Postgres with migrations and indexes

### D4. Auth &amp; Security (2–3 weeks) `[B]`

- [ ] Hashing: argon2/bcrypt, salting
- [ ] Sessions vs JWT; cookies (`httpOnly`, `secure`, `sameSite`); refresh tokens
- [ ] OAuth2/OIDC overview
- [ ] CORS, CSRF, XSS, SQL injection, rate limiting, helmet
- [ ] Secrets management, HTTPS, OWASP Top 10

- **Project:** auth system with roles and refresh tokens

### D5. Testing (2 weeks) `[B]`

- [ ] Unit vs integration vs e2e
- [ ] `node:test` or Vitest, `supertest`
- [ ] Test database, fixtures, mocking
- [ ] Coverage, TDD basics

- **Project:** full test suite for the D3 API

### D6. Production (3–4 weeks) `[B]`

- [ ] Logging (pino), monitoring, error tracking
- [ ] Docker, CI/CD
- [ ] Deployment (Render/Fly/VPS)
- [ ] Env config, health checks, graceful shutdown

- **Project:** API live at a public URL with DB and logs

### D7. Architecture &amp; Scale (ongoing) `[B]`

- [ ] Layered/hexagonal structure, DDD-lite
- [ ] Caching strategies, queues (BullMQ), cron/background jobs
- [ ] WebSockets, SSE, real-time apps
- [ ] Monolith vs microservices, message brokers overview
- [ ] Observability, load testing
- [ ] TypeScript for backend

- **Project:** capstone — URL shortener with analytics, or real-time chat

---

## Part E — Advanced JavaScript (expert level)

- [ ] Metaprogramming: `Proxy`, `Reflect`, `Symbol.toPrimitive`, property traps `[E]`
- [ ] Decorators (stage 3) `[E]`
- [ ] Memory: GC generations, leaks, `WeakRef`, `FinalizationRegistry`, heap snapshots `[E]`
- [ ] Performance: profiling, JIT, hidden classes, deoptimization, benchmarking `[E]`
- [ ] Async context: `AsyncLocalStorage`, microtask starvation `[E]`
- [ ] Design patterns: module, factory, observer, strategy, DI (and when NOT to use) `[B]`
- [ ] Reading ECMA-262 spec, TC39 process, tracking proposals `[E]`
- [ ] New/future features: Temporal, records/tuples, `using`, pattern matching, `Array.fromAsync`, `Set` methods `[E]`
- [ ] TypeScript (recommended after Part D) `[B]`

---

## Rules

- 70% coding / 30% reading. Retype examples, never copy-paste blindly.
- Every phase ends with its project; if you can't build it, repeat the phase.
- Revisit old code weekly; explain concepts out loud to test understanding.
- Don't start Part D until the A0–A7 + B1–B4 exit projects are done.

