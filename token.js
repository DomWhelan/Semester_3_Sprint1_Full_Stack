const fs = require("fs");
const path = require("path");

const crc32 = require("crc/crc32");

const date = require("date-and-time");

// Creating object of current date and time
const d = new Date();
// Format date object
const now = date.format(d, "YYYY/MM/DD HH:mm:ss");
const expDate = date.format(date.addDays(d, 2), "YYYY/MM/DD HH:mm:ss");

function newToken(username) {
  if (DEBUG) console.log("newToken Function called");

  let newToken = JSON.parse(`{
        "created": "1969-01-31 12:30:00",
        "username": "username",
        "email": "user@example.com",
        "phone": "5556597890",
        "token": "token",
        "expires": "1969-02-03 12:30:00",
        "confirmed": "tbd"
    }`);
}

module.exports = {
  tokenApp,
};
