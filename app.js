
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


// Partners-Futuristic Slide Controller
document.addEventListener('DOMContentLoaded', () => {
    const partnersData = [
        {
            title: "Sağlık Bakanlığı Onaylı",
            desc: "Kullandığımız tüm ürünler T.C. Sağlık Bakanlığı ve DSÖ (WHO) tarafından onaylı, çevre ve insan sağlığına zararsız biyosidal ürünlerdir.",
            badge: "SAĞLIK STANDARTLARI",
            tag: "T.C. Sağlık Bakanlığı & DSÖ",
            color: "#1D976C" // Main green
        },
        {
            title: "Garantili Hizmet",
            desc: "%100 müşteri memnuniyeti odağıyla, haşere ve kemirgen problemleriniz çözülene kadar garantili ilaçlama desteği sunuyoruz.",
            badge: "MEMNUNİYET GARANTİSİ",
            tag: "%100 Müşteri Memnuniyeti",
            color: "#18bc9c" // Teal
        },
        {
            title: "Uzman ve Sertifikalı Kadro",
            desc: "Uygulamalarımız, alanında uzman, sertifikalı ve periyodik eğitimlerden geçen profesyonel teknisyenlerimiz tarafından gerçekleştirilir.",
            badge: "EĞİTİMLİ EKİP",
            tag: "Sertifikalı Teknisyenler",
            color: "#2c3e50" // Slate
        },
        {
            title: "Kokusuz & Güvenli Uygulama",
            desc: "Yaşam alanlarınızı terk etmenize gerek kalmadan, günlük rutininizi bozmayan kokusuz ve modern jel/sıvı ilaçlama yöntemleri.",
            badge: "GÜVENLİ İLAÇLAMA",
            tag: "Modern Jel/Sıvı Yöntemler",
            color: "#3498db" // Blue
        },
        {
            title: "7/24 Acil Müdahale",
            desc: "Uşak ve çevresinde haşere istilalarına karşı esnek çalışma saatlerimizle dilediğiniz an hızlı ve kesin çözümler üretiyoruz.",
            badge: "7/24 ACİL SERVİS",
            tag: "Uşak ve Çevresi",
            color: "#2ecc71" // Green
        }
    ];

    let currentPage = 0;
    let autoPlayTimer = null;
    const duration = 7000; // 7 seconds

    const railItems = document.querySelectorAll('.pf-rail-item');
    const glowOrb = document.getElementById('pfGlowOrb');
    const cardLogo = document.getElementById('pfCardLogo');
    const cardLogoBox = document.getElementById('pfCardLogoBox');
    const cardTitle = document.getElementById('pfCardTitle');
    const cardDesc = document.getElementById('pfCardDesc');
    const cardTag = document.getElementById('pfCardTag');
    const counterCurrent = document.getElementById('pfCounterCurrent');
    const headerHighlight = document.getElementById('pf-header-highlight');
    const pfCard = document.getElementById('pfCard');

    if (!pfCard) return; // Exit if component is not present on current page

    function updateShowcase(index) {
        const item = partnersData[index];
        
        // Remove active class from all rail items
        railItems.forEach((btn) => {
            btn.classList.remove('pf-rail-active');
            
            // Clean up custom styling from previous states
            const logoWrap = btn.querySelector('.pf-rail-logo-wrap');
            const railName = btn.querySelector('.pf-rail-name');
            const progress = btn.querySelector('.pf-rail-progress');
            
            logoWrap.style.borderColor = '';
            logoWrap.style.boxShadow = '';
            railName.style.color = '';
            if (progress) {
                progress.style.backgroundColor = '';
                progress.style.transform = 'scaleX(0)';
                progress.style.transition = 'none';
            }
        });

        // Set active rail item
        const activeBtn = railItems[index];
        activeBtn.classList.add('pf-rail-active');
        
        const logoWrap = activeBtn.querySelector('.pf-rail-logo-wrap');
        const railName = activeBtn.querySelector('.pf-rail-name');
        const progress = activeBtn.querySelector('.pf-rail-progress');
        
        logoWrap.style.borderColor = item.color;
        logoWrap.style.boxShadow = `0 10px 25px -5px ${item.color}25, inset 0 0 15px ${item.color}05`;
        railName.style.color = '#0f172a';
        
        if (progress) {
            progress.style.backgroundColor = item.color;
            // Trigger progress animation
            progress.style.transition = 'none';
            progress.style.transform = 'scaleX(0)';
            // Force reflow
            progress.offsetHeight;
            progress.style.transition = `transform ${duration}ms linear`;
            progress.style.transform = 'scaleX(1)';
        }

        // Update Glow Orb color
        glowOrb.style.background = `radial-gradient(circle, ${item.color}0d 0%, transparent 70%)`;

        // Update Title Highlight Color
        if (headerHighlight) {
            headerHighlight.style.color = item.color;
        }

        // Add fade-out transition to card content, then change content and fade-in
        const cardRight = document.querySelector('.pf-card-right');
        if (cardRight) {
            cardRight.classList.remove('pf-fade-in-up');
            // Force reflow
            cardRight.offsetHeight;
            
            // Update contents
            cardLogo.src = `images/brands/brand${index + 1}.png`;
            cardLogo.alt = item.title;
            cardLogoBox.style.boxShadow = `0 0 30px ${item.color}30`;
            
            counterCurrent.textContent = String(index + 1).padStart(2, '0');
            cardTitle.textContent = item.title;
            cardDesc.textContent = item.desc;
            cardTag.textContent = item.tag;
            cardTag.style.borderColor = `${item.color}40`;
            cardTag.style.color = item.color;
            
            // Update card CSS variables for conic gradient border and glow shadow
            pfCard.style.setProperty('--border-gradient', `conic-gradient(from 180deg, transparent, ${item.color} 40%, transparent 60%, ${item.color} 90%, transparent 100%)`);
            pfCard.style.setProperty('--card-glow-shadow', `0 20px 60px -10px ${item.color}15, 0 10px 30px -10px rgba(15, 23, 42, 0.04)`);
            
            cardRight.classList.add('pf-fade-in-up');
        }

        currentPage = index;
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setTimeout(() => {
            let next = (currentPage + 1) % partnersData.length;
            updateShowcase(next);
            startAutoPlay();
        }, duration);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearTimeout(autoPlayTimer);
        }
    }

    // Attach click listeners to rail items
    railItems.forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            updateShowcase(index);
            startAutoPlay(); // Restart timer
        });
    });

    // Support card click to go next
    if (pfCard) {
        pfCard.addEventListener('click', () => {
            let next = (currentPage + 1) % partnersData.length;
            updateShowcase(next);
            startAutoPlay();
        });
    }

    // Initialize first page
    updateShowcase(0);
    startAutoPlay();
});


