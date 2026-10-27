# B1 — Notes: Event Loop & Runtime

Simple-English notes for an important backend topic. Read one section, run its example, then try the change suggested at the end.

## 1. What is a runtime?
**Simple idea:** JavaScript is the language; a runtime gives JavaScript a place to run and useful tools.

**A Node.js runtime includes:**
- **V8** — reads and runs JavaScript.
- **Node.js APIs** — tools such as `fs`, `http`, `process`, and timers.
- **libuv** — helps Node.js handle event-loop work and some operating-system operations.

The browser is another JavaScript runtime. It provides browser tools like `document` and `window`; Node.js provides server/computer tools and does not provide the DOM by default.

**Backend connection:** Node.js can run many I/O operations without keeping JavaScript busy the whole time. This helps a server handle other work while it waits for a file, database, or network response.

**Remember:** JavaScript is the language. Node.js is one runtime for that language.

## 2. The call stack: what JavaScript is doing now
**Simple idea:** the call stack is a list of JavaScript functions currently running.

When a function is called, it is put on the stack. When it returns, it is removed. JavaScript runs the current stack from top to bottom; it does not jump to a timer callback in the middle of a function.
```js
function first() { second(); }
function second() { console.log("inside second"); }
first();
console.log("after first");
```
The output is `inside second`, then `after first`.

**Run-to-completion:** a normal JavaScript task runs until its stack is empty before another task gets its turn.

**Backend connection:** one long-running route handler can stop other JavaScript callbacks from running while it occupies the stack.

**Remember:** if JavaScript is busy on the stack, the event loop must wait.

## 3. The heap: where data lives
**Simple idea:** the heap is an area where runtime-managed data, especially objects, lives.

Variables and function calls are not all stored in one simple place. For learning, use this mental model: the **stack** tracks active work; the **heap** stores objects that can outlive one function call.
```js
function makeUser() {
  return { name: "Mia" }; // object can be used after this function returns
}
const user = makeUser();
console.log(user.name); // Mia
```

When data is no longer reachable, the garbage collector may reclaim it. You do not manually free ordinary JavaScript objects.

**Gotchas:**
- Stack and heap are useful mental models, not a complete specification of V8 internals.
- A memory leak can happen when code keeps references it no longer needs.

**Remember:** functions run on the stack; objects can remain reachable in the heap.

## 4. The event loop: the basic picture
**Simple idea:** the event loop gives JavaScript another queued piece of work when the current work is finished.

Think of a worker serving one task at a time:
1. Run the current JavaScript until its call stack is empty.
2. Handle microtasks that are ready.
3. Let the runtime/event loop choose the next eligible task or callback.
4. Repeat.

The exact queues and phases differ between browsers and Node.js. The simple picture helps with the basics, but do not assume every runtime has one identical queue.

**Backend connection:** while Node waits for I/O, it can let other callbacks and requests make progress. When the I/O completes, its callback becomes eligible to run.

**Remember:** asynchronous means “the runtime can continue other work while waiting,” not “JavaScript runs two functions at once.”

## 5. Synchronous code and asynchronous I/O
**Synchronous work** runs now and keeps the call stack busy until it finishes.

**Asynchronous I/O** starts an operation and lets JavaScript continue. When the operation completes, Node schedules a callback or resolves a Promise.
```js
console.log("before");
setTimeout(() => console.log("later callback"), 0);
console.log("after");
```
`before` and `after` print before the timer callback.

File, network, and database APIs have different implementations. Some use operating-system facilities; some operations (including certain filesystem and crypto work) may use libuv's thread pool. Do not think that every async operation uses one identical mechanism.

**Remember:** starting async I/O does not freeze the JavaScript call stack while it waits.

## 6. Tasks and microtasks
**Simple idea:** Promise reactions run in the microtask queue; timers and many callbacks run as tasks/callbacks.

After the current JavaScript stack completes, the runtime processes queued microtasks before moving on to a later task. Promise `.then`/`.catch`/`.finally` callbacks and `queueMicrotask` use the microtask queue.
```js
console.log("sync start");
setTimeout(() => console.log("timer task"), 0);
Promise.resolve().then(() => console.log("Promise microtask"));
console.log("sync end");
```
Typical order: `sync start`, `sync end`, `Promise microtask`, `timer task`.

Microtasks added by another microtask are normally processed in the same microtask checkpoint before the runtime moves to another task.

**Gotchas:**
- An endless stream of microtasks can delay timers and I/O (microtask starvation).
- Browser and Node scheduling details are not identical.

**Remember:** finish current stack, drain microtasks, then move to later work.

## 7. Timers: “not before,” not “exactly at”
**Simple idea:** `setTimeout(fn, delay)` makes a callback eligible after a delay; it does not promise the exact run time.

If the call stack is busy, or higher-priority work is queued, the callback runs later. `setTimeout(fn, 0)` still waits until the current stack and required queued work are finished. Browser timers can also be clamped, especially in inactive tabs.

`setInterval` asks the runtime to schedule repeated callbacks, but callbacks can be delayed if the event loop is busy.

**Backend connection:** do not use a timer as an exact clock or deadline. For timeouts, track elapsed time and handle cancellation; Node timers are scheduling tools, not real-time guarantees.

**Remember:** a timer delay is a minimum eligibility delay, not an appointment time.

## 8. Node.js event-loop phases
**Simple idea:** Node organizes many callbacks into phases.

Important phases to recognize:
- **Timers** — callbacks for eligible `setTimeout` and `setInterval` timers.
- **Pending callbacks** — certain deferred system/I/O callbacks.
- **Poll** — retrieve and process I/O events; may wait for I/O when appropriate.
- **Check** — `setImmediate` callbacks run here.
- **Close callbacks** — some close events, such as a socket closing.

Node also has internal setup work (`idle`/`prepare`) not usually needed for beginner scheduling predictions. In Node 20, libuv changed timer processing relative to the poll phase; this is one reason to avoid claiming that every timer ordering is universal.

**Remember:** learn the major phases, but use documented behavior rather than depending on a fragile timing coincidence.

## 9. `process.nextTick` and Promise microtasks
**Simple idea:** Node's `process.nextTick` queue is processed before the regular Promise microtask queue after the current operation.

At a simple top-level example, if code schedules a `nextTick` callback and then a Promise `.then`, Node prints the `nextTick` callback first. `queueMicrotask` uses the Promise microtask queue.

**Important:** `process.nextTick` is Node-specific; browsers do not have it.

**Gotchas:**
- Recursively scheduling `process.nextTick` can starve I/O because Node keeps processing that queue.
- Prefer Promise/`queueMicrotask` for portable microtasks; use `nextTick` when you specifically need Node's behavior.

**Remember:** in Node, `nextTick` runs before Promise microtasks at the relevant checkpoint.

## 10. `setImmediate` vs `setTimeout(0)`
**Simple idea:** both schedule later work, but they are not interchangeable.

- `setImmediate` callbacks run in Node's **check** phase, after poll.
- `setTimeout(fn, 0)` runs when its timer is eligible in the timers phase.
- At top level, their relative order can depend on timing and runtime context. Do not write code that requires one fixed order there.
- Inside an I/O callback, a `setImmediate` scheduled there runs before a zero-delay timer scheduled there in the usual Node event-loop ordering.

**Remember:** choose the API for its intended use; do not use these as precise clocks.

## 11. Blocking work and CPU-bound work
**Simple idea:** while JavaScript performs long synchronous work, the event loop cannot run other JavaScript callbacks.

Examples of blocking work:
- A very large loop or expensive calculation.
- Synchronous filesystem calls such as `readFileSync` in a server request.
- Parsing or serializing a very large object.
- A regular expression with catastrophic backtracking.

Even if a timer or network response becomes ready during this work, its JavaScript callback must wait until the stack is clear.

For heavy CPU work, a server may use `worker_threads` or another process. That is a separate tool from async I/O and is covered later in Node Core.

**Backend connection:** a blocked event loop can make every request handled by that process feel slow.

**Remember:** async I/O helps waiting; it does not make CPU-heavy JavaScript run in parallel.

## 12. A simple method to predict output
Use this checklist before running code:
1. Write down all synchronous statements in order.
2. Mark each timer, I/O callback, `nextTick`, and Promise callback when it is scheduled.
3. Finish the current call stack first.
4. In Node, check `process.nextTick`, then Promise/`queueMicrotask` work at the checkpoint.
5. Consider which event-loop phase can run the remaining callbacks.
6. If timers and `setImmediate` are scheduled at top level, remember their order may vary.

**Practice:** predict the output first, write it down, then run the file and compare.

**Remember:** explain the queue/phase that makes each line run; do not memorize one output without its context.
