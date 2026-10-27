// Wrap an error with context and preserve the original as cause.
// Run: node examples/04-error-cause.js

function loadSettings(text) {
  try {
    return JSON.parse(text);
  } catch (cause) {
    throw new Error("Could not load settings", { cause });
  }
}

try {
  loadSettings("bad JSON");
} catch (error) {
  console.log(error.message); // Could not load settings
  console.log(error.cause.name); // SyntaxError
}

// Try this: include the file name in the outer error message.
