// ArrayBuffer = bytes. Typed arrays and DataView read them.
// Run: node examples/19-binary-data.js

const buffer = new ArrayBuffer(4);
console.log(buffer.byteLength); // 4

const bytes = new Uint8Array(buffer);
bytes[0] = 255;
bytes[1] = 1;
console.log(bytes); // Uint8Array(4) [ 255, 1, 0, 0 ]

const view = new DataView(buffer);
view.setUint16(0, 0x1234);
console.log(view.getUint16(0).toString(16)); // 1234 (big-endian)
console.log(view.getUint16(0, true).toString(16)); // 3412 (little-endian)

// Node's Buffer is a Uint8Array.
const nodeBuffer = Buffer.from("hi");
console.log(nodeBuffer); // <Buffer 68 69>
console.log(nodeBuffer instanceof Uint8Array); // true

// Try this: write a Float32 value and read it back.
