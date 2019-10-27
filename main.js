
(function() {
  "use strict";

  var panel;
  var timer;

  window.addEventListener("load", main);

  /**
  * main function that is called when the page loads
  */
  function main() {
    panel = 0;
    buttonActions();
    window.addEventListener("scroll", function() {
    	if(timer) {
    		window.clearTimeout(timer);
    	}

    	timer = window.setTimeout(function() {
    		// actual callback
        scrollAction();
    	}, 100);
    });
  }

  function scrollAction(){
    let offset = window.pageYOffset;
    let height = window.innerHeight;

    if(offset < height/2) {
      panel = 0;
    }else if (offset >= height / 2 && offset < height * 1.5){
      panel = 1;
    }else if (offset >= height * 1.5 && offset < height * 2.5) {
      panel = 2;
    }else if (offset >= height * 2.5 && offset < height * 3.5) {
      panel = 3;
    }else if (offset >= height * 3.5 && offset < height * 4.5) {
      panel = 4;
    }
  }

  function buttonActions(){
    var upbtn = document.getElementById("uparrow");
    var downbtn = document.getElementById("downarrow");

    upbtn.addEventListener("click", function(e){
        if(panel === 0){
          //do nothing
        }else if (panel === 1){
          panel = 0;
          window.location.hash = "panel0";
        }else if (panel === 2){
          panel = 1;
          window.location.hash = "panel1";
        }else if (panel === 3){
          panel = 2;
          window.location.hash = "panel2";
        }else if (panel === 4){
          panel = 3;
          window.location.hash = "panel3";
        }
    });

    downbtn.addEventListener("click", function(e){
        if(panel === 0){
          panel = 1;
          window.location.hash = "panel1";
        }else if (panel === 1){
          panel = 2;
          window.location.hash = "panel2";
        }else if (panel === 2){
          panel = 3;
          window.location.hash = "panel3";
        }else if (panel === 3){
          panel = 4;
          window.location.hash = "panel4";
        }
    });
  }

})();
