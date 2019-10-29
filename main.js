
(function() {
  "use strict";

  var panel;
  var timer;

  window.addEventListener("load", main);

  function main() {
    panel = 0;
    buttonActions();

    window.addEventListener("scroll", function() {
    	if(timer) {
    		window.clearTimeout(timer);
    	}

    	timer = window.setTimeout(function() {
        scrollAction();
    	}, 100);
    });
  }

  function scrollAction(){
    let offset = window.pageYOffset;
    let height = window.innerHeight;

    if(offset < height/2) {
      panel = 0; //main page
    }else if (offset >= height / 2 && offset < height * 1.5){
      panel = 1; //about
    }else if (offset >= height * 1.5 && offset < height * 2.5) {
      panel = 2; //resume
    }else if (offset >= height * 2.5 && offset < height * 3.5) {
      panel = 3; //connect
    }else if (offset >= height * 3.5 && offset < height * 4.5) {
      panel = 4; //footer
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


  /*********************************************
    
                      CAROUSEL

   ********************************************/

  var currentImg = 0;
  var gallery_img = ["img0.jpeg", "img1.jpeg", "img2.jpeg", 
                     "img3.jpeg", "img4.jpeg", "img5.jpeg",
                     "img6.jpeg", "img7.jpeg", "img8.jpeg",
                     "img9.jpeg", "img10.jpeg", "img11.jpeg",
                     "img12.jpeg", "img13.jpeg", "img14.jpeg", 
                     "img15.jpeg"];
  
  var carousel = document.querySelector('.carousel');
  var cells = carousel.querySelectorAll('.carousel__cell');
  var cellCount; // cellCount set from cells-range input value
  var selectedIndex = 0;
  var cellWidth = carousel.offsetWidth;
  var cellHeight = carousel.offsetHeight;
  var isHorizontal = true;
  var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  var radius, theta;
  // console.log( cellWidth, cellHeight );
  
  function rotateCarousel() {
    var angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
      rotateFn + '(' + angle + 'deg)';
  }
  
  var prevButton = document.querySelector('.previous-button');
  prevButton.addEventListener( 'click', function() {
    selectedIndex--;
    rotateCarousel();
  });
  
  var nextButton = document.querySelector('.next-button');
  nextButton.addEventListener( 'click', function() {
    selectedIndex++;
    rotateCarousel();
  });
  
  var cellsRange = document.querySelector('.cells-range');
  cellsRange.addEventListener( 'change', changeCarousel );
  cellsRange.addEventListener( 'input', changeCarousel );
  
  function changeCarousel() {
    cellCount = cellsRange.value;
    theta = 360 / cellCount;
    var cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
    for ( var i=0; i < cells.length; i++ ) {
      var cell = cells[i];
      if ( i < cellCount ) {
        // visible cell
        cell.style.opacity = 1;
        var cellAngle = theta * i;
        cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = 'none';
      }
    }
  
    rotateCarousel();
  }
  
  var orientationRadios = document.querySelectorAll('input[name="orientation"]');
  ( function() {
    for ( var i=0; i < orientationRadios.length; i++ ) {
      var radio = orientationRadios[i];
      radio.addEventListener( 'change', onOrientationChange );
    }
  })();
  
  function onOrientationChange() {
    var checkedRadio = document.querySelector('input[name="orientation"]:checked');
    isHorizontal = checkedRadio.value == 'horizontal';
    rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
    changeCarousel();
  }
  
  // set initials
  onOrientationChange();

    
  /*********************************************
    
                      MODAL

   ********************************************/
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  //var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  /*
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
  */

  // Get the <span> element that closes the modal
  var close = document.getElementsByClassName("close")[0];
  close.onclick = function() {
    modal.style.display = "none";
  }

  //next img
  var nextImg = document.getElementsByClassName("nextImg")[0];
  nextImg.onclick = function() {
    if (currentImg == cellCount - 1) currentImg = -1;
    modalImg.src = gallery_img[++currentImg];
  }
  //prev img
  var prevImg = document.getElementsByClassName("prevImg")[0];
  prevImg.onclick = function() {
    if (currentImg == 0) currentImg = cellCount;
    modalImg.src = gallery_img[--currentImg];
  }

  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    cell.onclick = function(index){
      return function(){
        modal.style.display = "block";
        modalImg.src = gallery_img[index];
        //captionText.innerHTML = this.alt;
        /*
        var style = cell.currentStyle || window.getComputedStyle(cell, false),
        bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
        */
      };
    }(i);
  }

  /*
  // Get the image id, style and the url from it
  var ximg = document.getElementById('testdiv'),
  xstyle = ximg.currentStyle || window.getComputedStyle(ximg, false),
  bi = xstyle.backgroundImage.slice(4, -1).replace(/"/g, "");

  // Display the url to the user
  console.log('Image URL: ' + bi);
  */
  
})();
