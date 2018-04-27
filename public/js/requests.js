var fType;
var linkCopied = false;
var idList = [];
var copyText = document.getElementById("linkInput");
var valid = false;

$(document).ready(function(){

  //pop up insurance
  $('#subSureYes').on('click', function(){
    valid = true;
    postMsg();
    $("#subSure").fadeOut("fast");
  });

  $('#subSureNo').on('click', function(){
    valid = false;
    $("#subSure").fadeOut("fast");
    //dont allow
  });

  //listen for copy link btn
  $('#copylink').on('click', function(){
    linkCopied = true;
    // document.execCommand("Copy");
    copytoClip(copyText);
  });

  //alternatively, user can open the link
  $('#openlink').on('click', function(){
    linkCopied = true;
    location.href = copyText.value;
  });

  //warn user before they leave if they havent copied their custom link
  window.addEventListener("beforeunload", function (e) {
    if (!linkCopied && valid) {
      $("#linkPop").show();
      var confirmationMessage = "Link";
      $('#linkPopNo').on('click', function(){
        $("#linkPop").hide();
      });
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  });

  //listen for final submit
  $('#submit').on('click', function() {
    //seperate the click events

    if($('#cmsgInput').val() != "") {
      $("#putMsg").html($('#cmsgInput').val());
      $("#subSure").fadeIn("fast");
    } //close if not empty
  }); //close on submit click

  //enter key aswell
  $(document).keypress(function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      if($('#cmsgInput').val() != "") {
        $("#putMsg").html($('#cmsgInput').val());
        $("#subSure").fadeIn("fast");
      } //close if not empty
    }
  });
  return false;
});
//check id list to generate a custom one
$.getJSON('../data/idList.json', function(result) {
  idList = result;
});

//post custom message to json with unique id (and flower type)
function postMsg() {
  console.log("check 1");
  if(valid) {
    console.log("check 2");
    //allow ajax
    //check message content
    var adata = { id: generateID(), msg: $('#cmsgInput').val(), fType: $("#flowerData").val()};
    $.ajax({
      type: 'POST',
      url: '/build',
      data: adata,
      success: function(data){
        //do something with the data via front-end framework
        console.log("lets do it");
        $("#cmsgInput").val("");
        $("#success").show();
        $("#copylink").show();
        $("#openlink").show();
        $("#linkInput").show();
        copyText.value = "https://flower.gives/flowers?id="+adata.id;

      }
    }); //close ajax
  } //close if valid
}

//generate unique id
function generateID() {
  var theSame = true;
  var i = 0;
  var id;

  while (theSame) {
    id = Math.floor(Math.random()* 1000000000);

      if (idList.includes(id)) {
        console.log("the same: "+id);
        theSame = true;
      }
      else {
        console.log("else: "+id);
        idList.push(id);
        theSame = false;
      }
  }
  return id;
}

//copy link button stuff (extra code to make ios work)
function copytoClip(el) {
  console.log("in copy");
  var oldContentEditable = el.contentEditable,
      oldReadOnly = el.readOnly,
      range = document.createRange();

  el.contentEditable = true;
  el.readOnly = false;
  range.selectNodeContents(el);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  document.execCommand('copy');

  el.select();

  document.execCommand('copy');
}
