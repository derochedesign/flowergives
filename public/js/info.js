var infoOpen = false;
var onInfo = false;
var onMsg = false;
var screenWidth = $(window).width();

$.getJSON('../../data/data.json', function(result) {
  console.log(result);
});

$("#copylink").click(function() {
  $(this).html("Copied");
});

// $( "#book" ).animate({
//   opacity: 0.25,
//   left: "+=50",
//   height: "toggle"
// }, 5000, function() {
//
// });

//ANIMATIONS FOR FABS_____________________________

$("#infoBtn").click(function() {
  onInfo = true;
  onMsg = false;

  if (infoOpen) {
    //closed
    $("#infoPop").fadeOut(500,"swing");
    $("#infoPop").css({transition: "0.5s ease", transform: "scale(1, 1)"});
    $("#infoOver").fadeOut(500,"swing");

    setTimeout( function() {
      $(".fab").css({zIndex:"99"});
    }, 500);
    $("#infoInfo").fadeOut(1000,"swing");
    $("#infoInfo").css({userSelect:"none", MozUserSelect:"none"});
    $("#infoI").css({fontSize:"1em"});
    $("#infoI").html("i");
    infoOpen = false;
  }
  else {
    if (screenWidth<=1920) {
      $("#infoPop").fadeIn(0,"linear");
      $("#infoPop").css({transition: "1.5s ease", transform: "scale(100, 100)"});
    }
    else {
      $("#infoPop").fadeIn(0,"swing");
      $("#infoPop").css({transition: "1.5s ease", transform: "scale(200, 200)"});
    }
    $("#infoOver").fadeIn(0,"swing");
    $(".infoFab").css({zIndex:"102"});
    $(".msgFab").css({zIndex:"10"});

    setTimeout( function() {
      $("#infoInfo").fadeIn(1000,"swing");
      $("#infoInfo").css({userSelect:"auto", MozUserSelect:"auto"});
    }, 300);
    $("#infoI").css({fontSize:"1em"});
    $("#infoI").html("&#x2715;");
    infoOpen = true;
  }
});

$("#msgBtn").click(function() {
  onInfo = false;
  onMsg = true;

  if (infoOpen) {
    //closed
    $("#msgPop").fadeOut(500,"swing");
    $("#msgPop").css({transition: "transform 0.5s ease", transform: "scale(1, 1)"});
    $("#msgOver").fadeOut(500,"swing");

    setTimeout( function() {
      $(".fab").css({zIndex:"99"});
    }, 500);
    $("#msgInfo").fadeOut(1000,"swing");
    $("#msgInfo").css({userSelect:"none", MozUserSelect:"none"});
    $("#msgI").css({fontSize:"1em"});
    $("#msgI").html("+");
    infoOpen = false;
  }
  else {
    if (screenWidth<=1920) {
      $("#msgPop").fadeIn(0,"linear");
      $("#msgPop").css({transition: "transform 1.5s ease", transform: "scale(100, 100)"});
    }
    else {
      $("#msgPop").fadeIn(0,"linear");
      $("#msgPop").css({transition: "transform 1.5s ease", transform: "scale(200, 200)"});
    }
    $("#msgOver").fadeIn(0,"swing");
    $(".msgFab").css({zIndex:"102"});
    $(".infoFab").css({zIndex:"10"});

    setTimeout( function() {
      $("#msgInfo").fadeIn(1000,"swing");
      $("#msgInfo").css({userSelect:"auto", MozUserSelect:"auto"});
    }, 300);
    $("#msgI").css({fontSize:"1em"});
    $("#msgI").html("&#x2715;");
    infoOpen = true;
  }
});
