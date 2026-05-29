
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

// Animated Places in Hero Section
const placesNameEl = document.querySelector('#animated-places');
const places = ['EVLER', 'MAĞAZALAR', 'DEPOLAR', 'YAŞAM ALANLARI', 'PARKLAR', 'VE DAHA ÇOKLARI'];
let currentPlaceIndex = 0;

function changePlace() {
    if (!placesNameEl) return;
    
    // Fade out
    placesNameEl.style.opacity = 0;
    
    setTimeout(() => {
        currentPlaceIndex = (currentPlaceIndex + 1) % places.length;
        placesNameEl.textContent = places[currentPlaceIndex];
        // Fade in
        placesNameEl.style.opacity = 1;
    }, 600); // Wait for fade out to complete (with safety margin) before changing text
}

if (placesNameEl) {
    setInterval(changePlace, 3000); // 3 seconds per word for slower reading and less overlap
}


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

// Interactive Showcase Carousel Controller (Flat Deck Style)
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.interactive-showcase-section');
    if (!section) return; // Exit if component is not present on this page

    const cards = section.querySelectorAll('.img-item');
    const titles = section.querySelectorAll('.showcase-title');
    const infos = section.querySelectorAll('.info-item');
    const prevBtn = document.getElementById('pfShowcasePrev');
    const nextBtn = document.getElementById('pfShowcaseNext');
    const glowOrb = document.getElementById('pfShowcaseGlow');

    const colors = ["#1D976C", "#18bc9c", "#2c3e50", "#3498db", "#e74c3c"];
    let activeIndex = 0;
    const N = cards.length;
    let autoPlayTimer = null;
    const autoPlayDelay = 5000;

    function updateShowcase(index) {
        activeIndex = (index + N) % N;

        // Update cards classes dynamically for the parallel Flat Deck transition
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');
            
            if (i === activeIndex) {
                card.classList.add('active');
            } else if (i === (activeIndex + 1) % N) {
                card.classList.add('next');
            } else if (i === (activeIndex - 1 + N) % N) {
                card.classList.add('prev');
            } else if (i === (activeIndex + 2) % N) {
                card.classList.add('hidden-right');
            } else {
                card.classList.add('hidden-left');
            }
        });

        // Update showcase titles
        titles.forEach((title, i) => {
            if (i === activeIndex) {
                title.classList.remove('inactive');
                title.classList.add('active');
            } else {
                title.classList.remove('active');
                title.classList.add('inactive');
            }
        });

        // Update detail info items (triggering the clip-path staggered reveal)
        infos.forEach((info, i) => {
            if (i === activeIndex) {
                info.classList.remove('inactive');
                info.classList.add('active');
            } else {
                info.classList.remove('active');
                info.classList.add('inactive');
            }
        });

        // Update active brand theme color
        const activeColor = colors[activeIndex] || '#1D976C';
        section.style.setProperty('--brand-color', activeColor);
        if (glowOrb) {
            glowOrb.style.background = `radial-gradient(circle, ${activeColor}0d 0%, transparent 70%)`;
        }
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(() => {
            updateShowcase(activeIndex + 1);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
        }
    }

    // Manual navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateShowcase(activeIndex - 1);
            startAutoPlay(); // Reset auto-play countdown
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateShowcase(activeIndex + 1);
            startAutoPlay(); // Reset auto-play countdown
        });
    }

    // Direct card click support to navigate
    cards.forEach((card, i) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (i === activeIndex) {
                // Clicking the active card advances the showcase
                updateShowcase(activeIndex + 1);
            } else {
                updateShowcase(i);
            }
            startAutoPlay(); // Reset auto-play countdown
        });
    });

    // Initialize the carousel
    updateShowcase(0);
    startAutoPlay();
});


