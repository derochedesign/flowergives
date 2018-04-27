const express = require('express');
const controller = require("./controller");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));

controller(app);

// app.use(express.static("./public"));

app.use(function(req, res) {
   res.render("404");
});

app.use(function(error, req, res, next) {
   res.render("500");
});

app.listen(process.env.PORT || 3000);
console.log("listening on 3000");
