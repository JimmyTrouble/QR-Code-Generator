const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("hello update");
});

app.listen(3000);
