// try runs risky code. catch handles the error. finally always runs.
// Run: node examples/12-try-catch.js

try {
  JSON.parse("{bad json}");
} catch (err) {
  console.log("Caught:", err.message);
} finally {
  console.log("finally always runs"); // Output: finally always runs
}

// Try this: change the JSON to `{"ok": true}` and run again.
