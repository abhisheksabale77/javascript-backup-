// debugger pauses here only when an inspector is attached.
// Run: node examples/10-debugger-statement.js
// Debug: node --inspect-brk examples/10-debugger-statement.js

const user = { name: "Mia", visits: 2 };

debugger; // attach DevTools, then inspect `user`

user.visits++;
console.log(`${user.name} has ${user.visits} visits`);
// Output: Mia has 3 visits

// Try this: start with --inspect-brk and set a breakpoint in DevTools.
