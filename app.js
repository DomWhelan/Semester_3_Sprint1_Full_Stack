/*

Sprint 1
Full Stack Semester 3
Group 6


*/

globalThis.DEBUG = true;

const fs = require("fs");
const args = process.argv.slice(2);

const { initDir, initFs } = require("./init.js");

switch (args[0]) {
  case "init":
  case "i":
    if (DEBUG)
      console.log(`\napp.js Arguments: ${args}\napp.js Case: 'init' or 'i'\n`);
    if (args[1] === "--all") {
      initDir();
      initFs();
    }
    if (args[1] === "--dir") {
      initDir();
    }
    if (args[1] === "--fs") {
      initFs();
    }
    break;
  case "config":
  case "c":
    if (DEBUG)
      console.log(
        `\napp.js Arguments: ${args}\napp.js Case: 'config' or 'c'\n`
      );
    break;
  case "token":
  case "t":
    if (DEBUG)
      console.log(`\napp.js Arguments: ${args}\napp.js Case: 'token' or 't'\n`);
    break;
  case "help":
  case "h":
    if (DEBUG)
      console.log(`\napp.js Arguments: ${args}\napp.js Case: 'help' or 'h'\n`);
    break;
  default:
    if (DEBUG) console.log(`Arguments: ${args}\n Case: 'default'`);
  // fs.readFile(__dirname + "/usage.txt", (error, data) => {
  //     if(error) throw error;
  //     console.log(data.toString());
  // });
}
