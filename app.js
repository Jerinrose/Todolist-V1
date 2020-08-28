const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
let items = [];
let workitems = [];

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  let today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-us", options);

  res.render("list", { listitle: day, newlistitem: items });
});
app.post("/", function (req, res) {
  item = req.body.newItem;

  if (req.body.list == "Work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listitle: "Work List", newlistitem: workitems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workitems.push(item);
  res.redirect("/work");
});

app.listen(3000, function (req, res) {
  console.log("Server started at 3000");
});
