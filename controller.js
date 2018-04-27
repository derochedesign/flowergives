var bodyParser = require("body-parser");
var fs = require('fs');

var fData = fs.readFileSync('./data/flowerData.json');
fData = JSON.parse(fData);

var urlencode = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/team", function(req, res){
    res.render("team");
  });

  app.get("/build/:fBuild", function(req, res) {
    var fType = req.params.fBuild;
    var uData = getByFlower(fData, fType);
    res.render("build", {data:uData});
  });

  app.get("/flowers", function(req, res) {
    // res.json(data)
    var aData = fs.readFileSync('./data/allData.json');
    aData = JSON.parse(aData);

    console.log(aData);
    var idQ = req.query;
    var uData = getById(aData, idQ.id);
    var faf = getByFlower(fData, uData.fType);
    res.render("custom", {data:uData, flower:faf});
  });

  app.post("/build", urlencode, function(req, res) {

    var aData = fs.readFileSync('./data/allData.json');
    aData = JSON.parse(aData);

    var idList = fs.readFileSync('./data/idList.json');
    idList = JSON.parse(idList);

    var msgData = req.body;
    aData.push(msgData);
    idList.push(msgData.id);
    res.json(aData);
    var writeJson = JSON.stringify(aData);
    var writeID = JSON.stringify(idList);
    fs.writeFile('./data/allData.json', writeJson, 'utf8');
    fs.writeFile('./data/idList.json', writeID, 'utf8');
  });

  //redirect any flower to /build/flower
  app.get("/:cF", function(req,res) {
    var fType = req.params.cF;
    res.redirect("/build/"+fType);
  });

};

function getById(arr, value) {
  for (var i=0; i<arr.length; i++) {
    if (arr[i].id == value) return arr[i];
  }
}

function getByFlower(arr, value) {
  for (var i=0; i<arr.length; i++) {
    if (arr[i].fType == value) return arr[i];
  }
}
