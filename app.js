
const bugsNameEl = document.querySelector('#bug-name')
const burger = document.querySelector('.line')
const menu = document.querySelector('.menu')


let bugs = ["Hamamböceği",'Pire','Karasinek','Fare ve Sıçan',"Tahtakurusu",'Kene']

let currentIndex = 0;

function displayNextBug() {
    bugsNameEl.textContent = bugs[currentIndex];
    currentIndex = (currentIndex + 1) % bugs.length;
  }
  
  setInterval(displayNextBug, 2000);


//button scroll top

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("scrollButton").style.display = "block";
      } else {
        document.getElementById("scrollButton").style.display = "none";
      }
    }

    const btnToTop = document.getElementById("scrollButton");
    btnToTop.addEventListener("click", scrollToTop);

    function scrollToTop() {
      document.body.scrollTop = 0; 
      document.documentElement.scrollTop = 0; 
    }
 

