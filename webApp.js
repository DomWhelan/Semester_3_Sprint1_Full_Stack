const express = require("express");
const path = require("path");

const app = express();

app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./webViews/index.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./webViews/404.html"));
});
