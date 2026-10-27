# A0 — Interview Prep

## Q1. What is Node.js?
Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets JavaScript run outside the browser, on the server or as a CLI tool.

## Q2. Difference between Node.js and browser JavaScript?
The language is the same. The environment differs: browsers provide `document`, `window`, DOM APIs; Node provides `fs`, `process`, `http`, and no DOM.

## Q3. What is npm?
npm (Node Package Manager) installs, updates, and manages third-party JavaScript packages for a project.

## Q4. What is `package.json`?
The project's manifest: name, version, scripts, dependencies, and settings like `"type": "module"`.

## Q5. What is `node_modules`?
The folder where npm installs dependencies. It is generated from `package.json` and should not be committed to Git.

## Q6. How do you run a JavaScript file in Node?
```bash
node app.js
```

## Q7. What is the Node REPL?
A Read-Eval-Print Loop: an interactive console started with `node`. You type JavaScript and see the result immediately.

## Q8. What is the difference between `node file.js` and the browser console?
`node file.js` runs a whole file in the Node runtime. The browser console runs single expressions in the browser runtime with access to DOM APIs.

## Q9. What is Git? How is it different from GitHub?
Git is a local version-control system that tracks code changes. GitHub is a website that hosts Git repositories online.

## Q10. What do `git init`, `git add`, and `git commit` do?
`git init` creates a repository. `git add` stages changes. `git commit` saves the staged changes as a snapshot with a message.

## Q11. What is a stack trace?
A list of function calls that led to an error. The top frame usually shows the exact file and line where the error occurred.

## Q12. How do you debug JavaScript in Chrome DevTools?
Open DevTools → Sources → click a line number to set a breakpoint → reload → inspect variables in the Scope panel and step through code.

## Q13. What is the difference between `console.log`, `console.warn`, and `console.error`?
They print at different severity levels. `warn` and `error` are visually highlighted and can be filtered separately in DevTools.

## Q14. What does LTS mean for Node.js?
Long Term Support: a stable release that receives security and bug fixes for an extended period. Use LTS for real projects.

## Common Mistakes
- Confusing Git with GitHub.
- Committing `node_modules` instead of adding it to `.gitignore`.
- Using `document` or `window` in Node — they do not exist there.
- Running `npm install` before creating `package.json` (works, but no dependency record).
- Ignoring the first line of an error and guessing the cause.
