// Store UTC. Format in an explicit timezone.
// Run: node examples/09-date-timezone-intl.js

const d = new Date("2024-01-01T00:00:00.000Z");
console.log(d.toISOString()); // 2024-01-01T00:00:00.000Z

const fmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
});
console.log(fmt.format(d)); // 1 Jan 2024, 5:30 am (ICU output may vary)

// Date-only strings are parsed as UTC midnight.
console.log(new Date("2024-01-01").toISOString()); // 2024-01-01T00:00:00.000Z

// Date-time strings without an offset are parsed as local time.
console.log(new Date("2024-01-01T00:00").getHours()); // 0 (local hour)

// Try this: format the same date for "America/New_York".
