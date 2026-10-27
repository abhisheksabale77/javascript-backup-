# B1 — Event Loop & Runtime

**Time:** 1 week · **Priority:** `[B]` backend-critical

## Topics
- [ ] Call stack, heap, and queues
- [ ] Synchronous execution and run-to-completion
- [ ] Tasks vs microtasks and their execution order
- [ ] Timers: `setTimeout`/`setInterval` and why timing is not exact
- [ ] Node.js event-loop phases: timers, poll, check, close
- [ ] `process.nextTick`, Promise callbacks, and `setImmediate`
- [ ] Blocking vs non-blocking work; CPU-bound tasks

## Examples
10 runnable files:
```bash
node examples\01-sync-call-stack.js
# ... up to 10-predict-the-order.js
```
Some examples intentionally have context-dependent output; their comments explain what can vary.

## Project
1. Predict the output order of at least five small async code examples before running them.
2. Write a script that schedules a timer, then performs a short CPU-heavy loop. Measure how late the timer runs.
3. Refactor the blocking part so it does not run before each scheduled callback.
4. Explain why async I/O can serve other requests while synchronous CPU work blocks the server.

## Done when
- [ ] You can explain call stack, queues, and event loop in your own words
- [ ] You can predict when Promise callbacks and timers run
- [ ] You know why `setTimeout(fn, 0)` does not run immediately
- [ ] You can explain the difference between `process.nextTick` and Promise microtasks
- [ ] You understand why top-level `setTimeout(0)` vs `setImmediate` order can vary
- [ ] You can identify code that blocks the Node.js event loop
