// Async generators can yield pages one at a time.
// Run: node examples/10-async-pagination.js

const data = [
  [{ id: 1 }, { id: 2 }],
  [{ id: 3 }],
  [], // empty page means there is no more data
];

async function fetchPage(page) {
  return data[page - 1] ?? [];
}

async function* pages(fetchPage) {
  for (let page = 1; ; page++) {
    const items = await fetchPage(page);
    if (items.length === 0) return;
    yield items;
  }
}

async function main() {
  for await (const page of pages(fetchPage)) {
    console.log(page);
  }
}

main();
// Output: page 1, then page 2 (contents shown above)

// Try this: change the page data and see how many pages are yielded.
