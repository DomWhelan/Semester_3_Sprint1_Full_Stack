const fs = require("fs");
const args = process.argv.slice(2);
const path = require("path");

const { initText, configText, tokenText } = require("./templates");

const Emitter = require("events");
class MyEmitter extends Emitter {}

// The main init function that calls helper functions based on the argument following init
// function initApp() {
//   if (DEBUG) console.log("initApp function called");
//   switch (args[1]) {
//     case "--all":
//       if (DEBUG) console.log(`Arguments: ${args}\nCase: init --all\n`);
//       initDir();
//       initFs();
//       break;
//     case "--dir":
//       if (DEBUG) console.log(`Arguments: ${args}\nCase: init --dir\n`);
//       initDir();
//       break;
//     case "--fs":
//       if (DEBUG) console.log(`Arguments: ${args}\nCase: init --fs\n`);
//       initFs();
//       break;
//     default:
//       if (DEBUG) console.log(`Arguments: ${args}\nCase: init default\n`);
//   }
// }

function writeFile(filename, text) {
  fs.writeFile(path.join(__dirname, "views", filename), text, (err) => {
    if (err) console.log(err);
    else if (DEBUG) console.log(`Filename: ${filename} created`);
  });
}

function initFs() {
  if (DEBUG) console.log("Init Files Function called");
  if (!fs.existsSync(path.join(__dirname, "./views"))) {
    console.log(
      'Directory "views" does not exist.\nUse "init --dir" prior to or "init --all" \n'
    );
  } else {
    writeFile("init.txt", initText);
    writeFile("config.txt", configText);
    writeFile("token.txt", tokenText);
  }
}

function mkDir(dir) {
  fs.mkdir(path.join(__dirname, dir), (err) => {
    if (err) console.log(err);
    else if (DEBUG) console.log("Directory created.");
  });
}

function dirCheck(dir) {
  if (fs.existsSync(path.join(__dirname, "./" + dir))) {
    if (DEBUG) console.log(dir + " Directory already exists");
    return true;
  }
}

function initDir() {
  if (DEBUG) console.log("initDir Function called");
  if (dirCheck("./views") === true) {
  } else {
    mkDir("views");
  }
}

module.exports = {
  initDir,
  initFs,
};
