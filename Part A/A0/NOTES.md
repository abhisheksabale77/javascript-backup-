# A0 — Notes (Simple English)

## 1. Editor — VS Code
- VS Code is a free editor for writing code.
- Useful extensions: ESLint, Prettier, Error Lens.
- Press `Ctrl + ~` to open the terminal inside VS Code.
- **Remember:** the editor only writes code. You need Node or a browser to run it.

## 2. What is Node.js
- Node.js runs JavaScript outside the browser, on your computer.
- It is a runtime, not a language. The language is still JavaScript.
- We use Node to build servers, CLI tools, and scripts.
- **Remember:** Node = JavaScript + access to the computer (files, network).

## 3. What is npm
- npm = Node Package Manager.
- It installs code written by other people (packages).
- `npm init -y` creates `package.json`.
- `npm install express` downloads a package into the `node_modules` folder.
- **Remember:** `package.json` = project ID; `node_modules` = installed packages.

## 4. Terminal basics
```powershell
cd "Part A\A0"     # go into a folder
dir                # list files (Windows)
mkdir notes        # create a folder
node app.js        # run a JS file
```
- **Remember:** use quotes around paths that contain spaces.

## 5. Three ways to run JS
1. **Node:** `node app.js` — for backend and scripts.
2. **Browser console:** F12 → Console — for quick tests.
3. **`<script>` tag:** inside an HTML file — for browser pages.
- **Remember:** the browser has `document`, Node does not. Node has `fs`, the browser does not.

## 6. Git basics
```bash
git init                 # start a repository
git add .                # stage changes
git commit -m "message"  # save a snapshot
git log --oneline        # show history
```
- Git is a time machine for your code.
- GitHub is a website that stores Git repositories online.
- **Remember:** Git and GitHub are different things.

## 7. Chrome DevTools
- Press F12, then open the **Console** tab to run JS.
- In the **Sources** tab, click a line number to set a breakpoint.
- At a breakpoint, the code pauses and you can inspect variables.
- **Remember:** writing `debugger;` in your code also pauses it there.

## 8. How to read a stack trace
```
TypeError: Cannot read properties of undefined (reading 'name')
    at getUser (app.js:12:20)
    at main (app.js:20:3)
```
- The first line says what went wrong.
- The `at ...` lines show where it happened. The top line is the real location.
- **Remember:** read the message, then look at `file:line`.

## 9. console methods
```js
console.log("normal");
console.warn("warning");
console.error("error");
console.table([{ a: 1 }, { a: 2 }]);
```
- **Remember:** `console.log` is the simplest debug tool, but breakpoints are stronger.

## 10. Quick summary
- Node = JS runtime, npm = package manager, Git = version control.
- You can run JS in three places: Node, browser console, `<script>`.
- When an error appears: read the message → stack trace → file:line → breakpoint.
