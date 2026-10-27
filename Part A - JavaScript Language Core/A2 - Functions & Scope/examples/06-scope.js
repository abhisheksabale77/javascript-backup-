// Global, function, and block scope.
// Run: node examples/06-scope.js

const globalValue = "global";

function showScope() {
  const functionValue = "function";
  if (true) {
    const blockValue = "block";
    console.log(globalValue, functionValue, blockValue);
  }
  // console.log(blockValue); // ReferenceError outside the block
}

showScope();

// Try this: uncomment the blockValue log and run to see the error.
