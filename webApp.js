const express = require("express");
const path = require("path");

const app = express();

// const newTokenBtn = document.getElementById("newTokenBtn");
// const newUser = document.getElementById("user");

const { newToken, findUser } = require("./token");

app.use(express.static("Sprint_1_Full_Stack"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./webViews"));

app.listen(3000);

app.get("/", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(username);
  res.render("index.html", { newToken, findUser });
});

app.get("/newUser", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.params);
  response = {
    user: req.query.username,
  };
  res.end(JSON.stringify(response));
  // res.render(newToken(username));
  // res.send(newToken(username));
});

app.use((req, res) => {
  res.status(404).render("404");
});
