const fs = require("fs");
const path = require("path");

const { configJson } = require("./templates");

const args = process.argv.slice(2);

function displayConfig() {
  if (DEBUG) console.log("displayConfig Function called");
  fs.readFile(__dirname + "/config.json", (error, data) => {
    if (error) throw error;
    console.log(JSON.parse(data));
  });
}

function setConfig() {
  if (DEBUG) console.log("config.setConfig()");
  if (DEBUG) console.log(args);
  let match = false;
  fs.readFile(__dirname + "/config.json", (error, data) => {
    if (error) throw error;
    if (DEBUG) console.log(JSON.parse(data));
    let cfg = JSON.parse(data);
    for (let key of Object.keys(cfg)) {
      if (key === args[2]) {
        cfg[key] = args[3];
        match = true;
      }
    }
    if (!match) {
      console.log(`invalid key: ${args[2]}, try another.`);
    }
    if (DEBUG) console.log(cfg);
    data = JSON.stringify(cfg, null, 2);
    fs.writeFile(__dirname + "/config.json", data, (error) => {
      if (error) throw error;
      if (DEBUG) console.log("Config file successfully updated.");
    });
  });
}

function resetConfig() {
  if (DEBUG) console.log("resetConfig Function called");
  let configdata = JSON.stringify(configJson, null, 2);
  fs.writeFile(__dirname + "/config.json", configdata, (error) => {
    if (error) throw error;
    if (DEBUG) console.log("Config file reset to original state");
  });
}

module.exports = {
  displayConfig,
  setConfig,
  resetConfig,
};
