
const bugsNameEl = document.querySelector('#bug-name')
const burger = document.querySelector('.line')
const menu = document.querySelector('.menu')


let bugs = ["Hamamböceği",'Pire','Karasinek','Fare ve Sıçan',"Tahtakurusu",'Kene']

let currentIndex = 0;

function displayNextBug() {
    if (bugsNameEl) {
        bugsNameEl.textContent = bugs[currentIndex];
    }
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


// Carousel Gallery
const carouselImages = [
  "/images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.39 (1).jpeg",
  "/images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.39.jpeg",
  "/images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.41.jpeg",
  "/images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.46 (1).jpeg",
  "./images/ilaclamaResimler/cozumilaclama.jpeg",
  "/images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.41 (1).jpeg"
];

let carouselIndex = 0;

const carouselImage = document.getElementById('carouselImage');
const imageCounter = document.getElementById('imageCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateCarouselImage() {
  carouselImage.src = carouselImages[carouselIndex];
  imageCounter.textContent = `${carouselIndex + 1} / ${carouselImages.length}`;
}

function nextImage() {
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  updateCarouselImage();
}

function prevImage() {
  carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
  updateCarouselImage();
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Auto-rotate every 5 seconds
setInterval(nextImage, 5000);


// Contact Modal Functions
function openContactModal() {
  const modal = document.getElementById('contactModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('contactModal');
  if (event.target === modal) {
    closeContactModal();
  }
});


