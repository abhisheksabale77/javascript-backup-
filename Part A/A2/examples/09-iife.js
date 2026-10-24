// An IIFE runs immediately and keeps variables private.
// Run: node examples/09-iife.js

const result = (function () {
  const secret = "hidden";
  return "IIFE ran with " + secret;
})();

console.log(result); // Output: IIFE ran with hidden

// Try this: log `secret` outside the IIFE — it is not defined.
