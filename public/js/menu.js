var menuOpen = false;
var menu = document.getElementById('menuBtn');

menu.addEventListener("click", function() {
  if (menuOpen) {
    //close menu
    $("#menu_mid").css({opacity: 1,visibility: "visible"});
    $("#menu_top").css({transform: "rotate(0) translateY(0) translateX(0)", backgroundColor:"white"});
    $("#menu_btm").css({transform: "rotate(0) translateY(0) translateX(0)", backgroundColor:"white"});
    $(".title_box").fadeOut();
    $("#menuOpen").css({opacity: 0,visibility: "hidden"});
    menuOpen = false;
  }
  else {
    //open menu
    $("#menu_mid").css({opacity: 0,visibility: "hidden"});
    $("#menu_top").css({transform: "rotate(45deg) translateY(4.2px) translateX(4.2px)", backgroundColor:"black"});
    $("#menu_btm").css({transform: "rotate(-45deg) translateY(-4.2px) translateX(4.2px)", backgroundColor:"black"});
    $(".title_box").fadeIn();
    $("#menuOpen").css({opacity: 1,visibility: "visible"});
    menuOpen = true;
  }
});
