# B1 — Interview Prep

## Q1. What is a JavaScript runtime?
An environment that runs JavaScript and provides APIs. Node.js uses V8 plus Node APIs and libuv; a browser provides APIs such as the DOM.

## Q2. What is the call stack?
A structure that tracks the currently running JavaScript function calls. A function is added when called and removed when it returns.

## Q3. What is the heap?
A runtime-managed area where objects and other data can live beyond one function call. The garbage collector can reclaim data that is no longer reachable.

## Q4. What does run-to-completion mean?
A synchronous JavaScript task runs until its current call stack is empty before another task's JavaScript callback runs.

## Q5. What does the event loop do?
It coordinates when queued callbacks are allowed to run after current JavaScript work completes. The exact queues and phases depend on the runtime.

## Q6. Does asynchronous JavaScript mean two JavaScript functions run at the same time?
No. JavaScript on one event loop runs one callback at a time. Async I/O lets the runtime wait for external work while JavaScript does other work.

## Q7. What is the difference between a task and a microtask?
Tasks include many timer and I/O callbacks. Microtasks include Promise reactions and `queueMicrotask`. After the current stack, microtasks are processed before later tasks.

## Q8. Why does a Promise callback usually run before `setTimeout(fn, 0)`?
The Promise reaction is a microtask. A zero-delay timer only becomes eligible for a later timer callback; it does not run during the current stack.

## Q9. Does `setTimeout(fn, 100)` guarantee the callback runs in exactly 100 ms?
No. It makes the callback eligible after the delay. A busy stack, queued work, or timer clamping can make it run later.

## Q10. What are important Node.js event-loop phases?
Timers, pending callbacks, poll, check, and close callbacks. `setImmediate` callbacks run in the check phase; I/O is handled around the poll phase.

## Q11. How does `process.nextTick` differ from a Promise callback?
`process.nextTick` is Node-specific and its queue is processed before the regular Promise microtask queue at the relevant checkpoint. Promise callbacks use the microtask queue.

## Q12. Why can recursive `process.nextTick` calls be dangerous?
They can keep the next-tick queue busy and delay I/O and other event-loop work.

## Q13. Difference between `setImmediate` and `setTimeout(fn, 0)`?
`setImmediate` runs in Node's check phase. A zero-delay timer runs when eligible in the timers phase. Their top-level order can vary with context; inside an I/O callback, `setImmediate` usually runs first.

## Q14. What is blocking code in Node.js?
Synchronous work that keeps the JavaScript call stack busy and prevents other callbacks from running, such as a long CPU loop or synchronous file operation.

## Q15. Does async I/O make CPU-heavy JavaScript run in parallel?
No. Async I/O avoids blocking while waiting, but CPU-heavy JavaScript still runs on the event-loop thread. Use workers or processes for CPU parallelism when appropriate.

## Q16. What is microtask starvation?
When code continually schedules microtasks, preventing the runtime from moving on to timers, I/O, or rendering work.

## Q17. What is the difference between Node's and the browser's event loop?
Both coordinate JavaScript and queued work, but their APIs and scheduling details differ. Node has phases and APIs such as `process.nextTick`; browsers also coordinate rendering and user-interface tasks.

## Q18. How do you predict async output order?
First list synchronous statements, then scheduled callbacks. Finish the current stack, process microtasks, and account for the relevant runtime phase. Mark timing-dependent ordering as variable.

## Common Mistakes
- Thinking `setTimeout(fn, 0)` means “run immediately.”
- Assuming async I/O makes CPU-heavy JavaScript parallel.
- Treating browser and Node scheduling details as identical.
- Assuming top-level `setTimeout(0)` and `setImmediate` always have one order.
- Forgetting that `process.nextTick` is Node-specific.
- Scheduling endless microtasks or next-tick callbacks and starving other work.
- Memorizing an output without understanding where each callback was scheduled.
