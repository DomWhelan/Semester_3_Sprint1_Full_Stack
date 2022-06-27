const fs = require("fs");
const path = require("path");

const crc32 = require("crc/crc32");

const date = require("date-and-time");

// Creating object of current date and time
const d = new Date();
// Format date object
const now = date.format(d, "YYYY/MM/DD HH:mm:ss");
const expDate = date.format(date.addDays(d, 2), "YYYY/MM/DD HH:mm:ss");

const { logEvent } = require("./logger.js");

const Emitter = require("events");
class MyEmitter extends Emitter {}
const myEmitter = new MyEmitter();

myEmitter.addListener("log", (event, type, message) =>
  logEvent(event, type, message)
);

function countToken() {
  if (DEBUG) console.log("countToken Function called");

  fs.readFile(__dirname + "/tokens.json", (err, data) => {
    if (err) {
      myEmitter.emit(
        "log",
        "countToken()",
        "ERROR",
        "File: 'tokens.json' could not be read"
      );
      console.log(err);
    } else {
      let tokens = JSON.parse(data);
      if (DEBUG) console.log(tokens);
      let count = Object.keys(tokens).length;
      console.log(`Current token count is ${count}.`);
      myEmitter.emit(
        "log",
        "countToken()",
        "INFO",
        "File: 'config.json' read successfully and token count provided"
      );
      writeFile("countToken.txt", `Current token count is ${count}.`);
    }
  });
}

function newToken(username) {
  if (DEBUG) console.log("newToken Function called");

  let newToken = JSON.parse(`{
        "created": "YYYY/MM/DD HH:mm:ss",
        "username": "username",
        "email": "user@example.com",
        "phone": "1234567890",
        "token": "token",
        "expires": "YYYY/MM/DD HH:mm:ss"
  }`);

  newToken.created = now;
  newToken.username = username;
  newToken.token = crc32(username).toString(16);
  newToken.expires = expDate;

  fs.readFile(__dirname + "/tokens.json", "utf-8", (err, data) => {
    if (err) {
      myEmitter.emit(
        "log",
        "newToken()",
        "ERROR",
        "File: 'tokens.json' could not be read"
      );
      throw err;
    }

    let tokens = JSON.parse(data);

    tokens.push(newToken);
    userTokens = JSON.stringify(tokens);

    fs.writeFile(__dirname + "/tokens.json", userTokens, (err) => {
      if (err) {
        myEmitter.emit(
          "log",
          "newToken()",
          "ERROR",
          "File: 'tokens.json' could not be updated"
        );
        throw err;
      } else {
        console.log(`New token ${newToken.token} was created for ${username}.`);
        myEmitter.emit(
          "log",
          "newToken()",
          "INFO",
          "File: 'tokens.json' successfully updated"
        );
      }
    });
  });
  return newToken.token;
}

function findUser(user) {
  if (DEBUG) console.log("findUser Function called for " + user);

  fs.readFile(__dirname + "/tokens.json", (err, data) => {
    let result = "";
    if (!err) {
      let tokens = JSON.parse(data);
      tokens.forEach((token) => {
        if (token.username === user) {
          console.log(token);
          result = token;
          myEmitter.emit(
            "log",
            "findUser()",
            "INFO",
            "File: 'tokens.json' successfully read, User: '" + user + "' found"
          );
        }
      });
      writeFile("findUser.txt", JSON.stringify(result));
    } else {
      console.log(err);
      myEmitter.emit(
        "log",
        "findUser()",
        "ERROR",
        "File: 'tokens.json' could not be read"
      );
    }
  });
}

function isExp(user) {
  fs.readFile(__dirname + "/tokens.json", (err, data) => {
    let result = `User: ${user} could not be found`;
    if (!err) {
      let tokens = JSON.parse(data);
      tokens.forEach((token) => {
        if (token.username === user) {
          result = token.expires;
          myEmitter.emit(
            "log",
            "checkToken()",
            "INFO",
            "File: 'tokens.json' checked token expirary date of User: '" + user
          );
        }
      });
      console.log(result);
      return result;
    } else {
      console.log(err);
      myEmitter.emit(
        "log",
        "findUser()",
        "ERROR",
        "File: 'tokens.json' could not be read"
      );
    }
  });
}
function writeFile(filename, text) {
  fs.writeFile(path.join(__dirname, "views", filename), text, (err) => {
    if (err) console.log(err);
    else if (DEBUG) console.log(`Filename: ${filename} created`);
  });
}

module.exports = {
  newToken,
  countToken,
  findUser,
};
