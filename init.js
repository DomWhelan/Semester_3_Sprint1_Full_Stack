const fs = require("fs");
const args = process.argv.slice(2);
const path = require("path");

function initApp() {
  if (DEBUG) console.log("initApp function called");
  switch (args[1]) {
    case "--all":
      if (DEBUG) console.log(`Arguments: ${args}\nCase: init --all\n`);
      initDir();
      initFs();
      break;
    case "--dir":
      if (DEBUG) console.log(`Arguments: ${args}\nCase: init --dir\n`);
      initDir();
      break;
    case "--fs":
      if (DEBUG) console.log(`Arguments: ${args}\nCase: init --fs\n`);
      initFs();
      break;
    default:
      if (DEBUG) console.log(`Arguments: ${args}\nCase: init default\n`);
    //   fs.readFile(__dirname + "/views/init.txt", (error, data) => {
    //     if (error) throw error;
    //     console.log(data.toString());
    //   });
  }
}

function initFs() {
  if (DEBUG) console.log("Init Files Function called");
}

function initDir() {
  if (DEBUG) console.log("initDir Function called");
  if (fs.existsSync(path.join(__dirname, "./views"))) {
    if (DEBUG) console.log("initDir - Directory already exists");
  } else {
    if (DEBUG) console.log("initDir - create directory");
    fs.mkdir(path.join(__dirname, "views"), (err) => {
      if (err) console.log(err);
      else if (DEBUG) console.log("Directory created.");
    });
  }
}

module.exports = {
  initApp,
};
