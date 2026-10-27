// if/else for ranges. switch for fixed values.
// Run: node examples/11-if-switch.js

const score = 82;

if (score >= 90) {
  console.log("A");
} else if (score >= 75) {
  console.log("B"); // Output: B
} else {
  console.log("C");
}

const day = "sat";
switch (day) {
  case "sat":
  case "sun":
    console.log("weekend"); // Output: weekend
    break;
  default:
    console.log("workday");
}

// Try this: remove the `break` and watch the fall-through.
