//import the express module
var express = require("express");
const path = require("path");
const fs = require("fs");

//store the express in a variable
var app = express();

const { newToken, findUser, countToken } = require("./token");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./webViews"));

global.DEBUG = false;

//designate what to display for home extension '/'
app.get("/", function (req, res) {
  res.render(__dirname + "/webViews/" + "index.ejs");
});

//This sends the user token to the path generated by the form
app.get("/newUser", function (req, res) {
  response = {
    Token: newToken(req.query.username),
  };
  res.end(JSON.stringify(response));
});

// Display token info for specified user
app.get("/findUser", function (req, res) {
  findUser(req.query.username);
  setTimeout(() => {
    fs.readFile(__dirname + "/views/findUser.txt", (err, data) => {
      if (err) throw err;
      else res.end(data);
    });
  }, 2000);
});

app.get("/countToken", function (req, res) {
  countToken();
  setTimeout(() => {
    fs.readFile(__dirname + "/views/countToken.txt", (err, data) => {
      if (err) throw err;
      else res.end(data);
    });
  }, 2000);
});

// This will only be used if none of the above condtions are met
app.use((req, res) => {
  res.status(404).render("404");
});

//Create the server
//specify a port fro the app to listen
const server = app.listen(8888, function () {
  const port = server.address().port;
  console.log("Web app listening at port: ", port);
});
