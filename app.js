
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
  "images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.39 (1).jpeg",
  "images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.39.jpeg",
  "images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.41.jpeg",
  "images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.46 (1).jpeg",
  "images/ilaclamaResimler/cozumilaclama.jpeg",
  "images/ilaclamaResimler/WhatsApp Image 2023-06-13 at 23.22.41 (1).jpeg",
  "images/ilaclamaResimler/yeni_ilaclama_1.jpg",
  "images/ilaclamaResimler/yeni_ilaclama_2.jpg",
  "images/ilaclamaResimler/yeni_ilaclama_3.jpg",
  "images/ilaclamaResimler/yeni_ilaclama_4.jpg",
  "images/ilaclamaResimler/yeni_ilaclama_5.jpg"
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

    const colors = [
        "#1D976C", // Uşak Belediyesi
        "#18bc9c", // Dabbagh Group
        "#2c3e50", // Anemon Hotels
        "#3498db", // ChocoLabs
        "#e74c3c", // Mutfak Kafe
        "#9b59b6", // Lumberjack Cafe
        "#f1c40f", // Sheraton Hotel
        "#e67e22", // Soulmate Cafe
        "#1abc9c", // EspressoLab Cafe
        "#d35400", // Koala Cafe
        "#27ae60", // TreeHouse Cafe
        "#2980b9"  // Kanyon Hayvancılık
    ];
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
            } else {
                // Calculate if the card index is closer to the right or left of activeIndex
                let diff = (i - activeIndex + N) % N;
                if (diff < N / 2) {
                    card.classList.add('hidden-right');
                } else {
                    card.classList.add('hidden-left');
                }
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

        // Update detail info items (triggering the smooth fade reveal)
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

// Google Reviews Carousel Controller (Automated 4+ Stars Filter & Touch Support)
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('google-reviews');
    if (!section) return;

    // Authentic reviews dataset (Only 4+ stars will be displayed)
    const rawGoogleReviews = [
        {
            name: "Aysu Yılmaz",
            initials: "AY",
            date: "10/09/2024",
            rating: 5,
            text: "Bir ilaçlama firmasından kesinlikle daha fazlası. Sorunumla ilgili görüşme sağladığım günden beri ilgi ve alakalarından son derece memnun kaldık. Doğru yönlendirme ve sorun çözme odaklı bir firma olduğunu kesinlikle belirtmek isterim."
        },
        {
            name: "Mehmet Kılınç",
            initials: "MK",
            date: "22/10/2024",
            rating: 5,
            text: "Uşak'ta restoranımız için düzenli pest kontrol ve ilaçlama hizmeti alıyoruz. Gıda güvenliği standartlarına uygun, kokusuz ve son derece titiz çalışıyorlar. İşletme sahiplerine gönül rahatlığıyla tavsiye ederim."
        },
        {
            name: "Selim Öztürk",
            initials: "SÖ",
            date: "15/11/2024",
            rating: 5,
            text: "Apartmanımızda pire ve böcek sorunu vardı, aradıktan 2 saat sonra gelip müdahale ettiler. Güler yüzlü, işini bilen ve arkasında duran bir ekip. İlaçlama sonrası hiçbir koku kalmadı. Çok teşekkürler Çözüm İlaçlama."
        },
        {
            name: "Emel Bayrak",
            initials: "EB",
            date: "03/12/2024",
            rating: 5,
            text: "Yazlığımızda kene ve böcek şüphesi vardı. Detaylı keşif yapıp en doğru yöntemi uyguladılar. Zamanında geldiler ve tüm sorularımızı sabırla yanıtladılar. Kesinlikle 5 yıldızı hak ediyorlar."
        },
        {
            name: "Hasan Demir",
            initials: "HD",
            date: "18/01/2025",
            rating: 5,
            text: "Müstakil evimizde depoda zararlı böcek sorunu yaşıyorduk. Çözüm İlaçlama ekipleri profesyonel şekilde müdahale ederek kısa sürede kalıcı çözüm sundu. Son derece güvenilir bir firma."
        },
        {
            name: "Tuğba Karaca",
            initials: "TK",
            date: "05/02/2025",
            rating: 5,
            text: "Hamam böceği kabusumuz olmuştu. Çözüm İlaçlama kokusuz jel ve özel yöntemler ile kesin sonuca ulaştırdı. İlgileri ve kontrolleri mükemmel, Uşak ve çevresinde bir numaralar."
        },
        {
            name: "Murat Arslan",
            initials: "MA",
            date: "14/02/2025",
            rating: 5,
            text: "Ofisimizde haşere sorunu vardı. Randevu saatine tam uyarak çalışmaya başladılar. Çalışanların üslubu ve ilgisi harikaydı, sonrasında da arayıp durum takibi yaptılar. Kesinlikle öneririm."
        },
        {
            name: "Burcu Aksoy",
            initials: "BA",
            date: "28/02/2025",
            rating: 5,
            text: "Referans üzerine ulaştık. Evimizdeki kalorifer böceği derdinden tek uygulamada kurtardılar. Fiyatlandırma gayet makul, işçilik 10 numara. Elinize sağlık."
        },
        {
            name: "Erhan Şahin",
            initials: "EŞ",
            date: "12/03/2025",
            rating: 5,
            text: "Fırın ve gıda üretim alanımızda rutin dezenfeksiyon ve pest kontrol için anlaştık. Mevzuata tam uygun raporlama ve periyodik takip veriyorlar. İşimizi çok kolaylaştırdılar."
        },
        {
            name: "Sibel Doğan",
            initials: "SD",
            date: "25/03/2025",
            rating: 5,
            text: "Küçük çocuklu bir aile olarak kokusuz ilaçlama arıyorduk. Ekipler sağlığa zararsız, bakanlık onaylı ürünler kullanarak işlem yaptı. Evden ayrılmamıza bile gerek kalmadı."
        },
        {
            name: "Serkan Yüksel",
            initials: "SY",
            date: "08/04/2025",
            rating: 5,
            text: "Depomuzda tahtakurdu ve zararlılar için yardım istedik. Kısa sürede tespit yapıp kalıcı çözüm sağladılar. Telefonla aradığımda her soruma sabırla yanıt verdiler."
        },
        {
            name: "Nesrin Kaya",
            initials: "NK",
            date: "20/04/2025",
            rating: 5,
            text: "Site yönetimi olarak tüm blokların bodrum, sığınak ve ortak alanlarını ilaçlattık. Sorunsuz, tertemiz teslim ettiler. Önümüzdeki sezon için de tekrar kendileriyle çalışacağız."
        },
        {
            name: "Caner Yıldız",
            initials: "CY",
            date: "02/05/2025",
            rating: 5,
            text: "Yaz sezonu öncesi bahçeli evimizin çevresine koruyucu bariyer ilaçlama yapıldı. Akrep ve çiyan gibi zararlılar tamamen engellendi. İşinin uzmanı güler yüzlü bir kadro."
        },
        {
            name: "Sevgi Altın",
            initials: "SA",
            date: "19/05/2025",
            rating: 5,
            text: "Kafe işletmemiz için 2 yıldır kesintisiz ilaçlama ve dezenfeksiyon desteği alıyoruz. Disiplinli, dürüst ve sözünün eri insanlar. Uşak'ta ilaçlama konusunda tek adres."
        }
    ];

    // AUTOMATIC FILTERING: Strictly enforce rating >= 4 (Reviews below 4 stars are automatically ignored)
    const reviews = rawGoogleReviews.filter(r => r.rating >= 4);
    if (reviews.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;

    // DOM Elements
    const reviewTextEl = document.getElementById('grReviewText');
    const authorNameEl = document.getElementById('grAuthorName');
    const authorAvatarEl = document.getElementById('grAuthorAvatar');
    const starsEl = document.getElementById('grStars');
    const dotsNavEl = document.getElementById('grDotsNav');
    const bubbleCardEl = document.getElementById('grBubbleCard');
    const prevBtn = document.getElementById('grPrevBtn');
    const nextBtn = document.getElementById('grNextBtn');

    let startTime = null;
    let animReqId = null;
    let isPaused = false;
    let elapsedBeforePause = 0;
    const autoPlayDelay = 3000;

    const counterEl = document.getElementById('grCounter');

    // Create pagination dots with inner fill bar
    if (dotsNavEl) {
        dotsNavEl.innerHTML = '';
        reviews.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = `dot ${idx === 0 ? 'active' : ''}`;
            const fill = document.createElement('span');
            fill.className = 'dot-fill';
            dot.appendChild(fill);

            dot.addEventListener('click', () => {
                goToSlide(idx);
            });
            dotsNavEl.appendChild(dot);
        });
    }

    function renderSlide(index) {
        const r = reviews[index];
        if (!r) return;

        // Smooth transition effect
        if (bubbleCardEl) {
            bubbleCardEl.style.opacity = '0';
            bubbleCardEl.style.transform = 'translateY(6px)';
        }

        setTimeout(() => {
            // Update review content
            if (reviewTextEl) reviewTextEl.textContent = `"${r.text}"`;
            if (authorNameEl) authorNameEl.textContent = r.name;
            if (authorAvatarEl) authorAvatarEl.textContent = r.initials || r.name.substring(0, 2).toUpperCase();

            // Render Stars
            if (starsEl) {
                let starsHTML = '';
                for (let i = 0; i < 5; i++) {
                    if (i < r.rating) {
                        starsHTML += '<i class="bi bi-star-fill"></i>';
                    } else {
                        starsHTML += '<i class="bi bi-star"></i>';
                    }
                }
                starsEl.innerHTML = starsHTML;
            }

            // Fade back in
            if (bubbleCardEl) {
                bubbleCardEl.style.opacity = '1';
                bubbleCardEl.style.transform = 'translateY(0)';
            }
        }, 200);
    }

    function animateProgress(timestamp) {
        if (!startTime) startTime = timestamp - elapsedBeforePause;
        const elapsed = timestamp - startTime;
        const percent = Math.min((elapsed / autoPlayDelay) * 100, 100);

        if (dotsNavEl) {
            const activeDotFill = dotsNavEl.querySelector('.dot.active .dot-fill');
            if (activeDotFill) {
                activeDotFill.style.width = percent + '%';
            }
        }

        if (elapsed < autoPlayDelay) {
            if (!isPaused) {
                animReqId = requestAnimationFrame(animateProgress);
            }
        } else {
            nextSlide();
        }
    }

    function startProgress() {
        stopProgress();
        isPaused = false;
        elapsedBeforePause = 0;
        startTime = null;

        // Reset dots and set active dot
        if (dotsNavEl) {
            const dots = dotsNavEl.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                const isActive = (idx === currentIndex);
                dot.classList.toggle('active', isActive);
                const fill = dot.querySelector('.dot-fill');
                if (fill) {
                    fill.style.width = '0%';
                }
            });
        }

        // Update counter
        if (counterEl) {
            const currentStr = String(currentIndex + 1).padStart(2, '0');
            const totalStr = String(reviews.length).padStart(2, '0');
            counterEl.textContent = `${currentStr} / ${totalStr}`;
        }

        animReqId = requestAnimationFrame(animateProgress);
    }

    function pauseProgress() {
        if (isPaused) return;
        isPaused = true;
        if (animReqId) {
            cancelAnimationFrame(animReqId);
            animReqId = null;
        }
        if (startTime) {
            elapsedBeforePause = performance.now() - startTime;
        }
    }

    function resumeProgress() {
        if (!isPaused) return;
        isPaused = false;
        startTime = null;
        animReqId = requestAnimationFrame(animateProgress);
    }

    function stopProgress() {
        isPaused = false;
        elapsedBeforePause = 0;
        startTime = null;
        if (animReqId) {
            cancelAnimationFrame(animReqId);
            animReqId = null;
        }
    }

    function goToSlide(index) {
        currentIndex = (index + reviews.length) % reviews.length;
        renderSlide(currentIndex);
        startProgress();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }

    // Pause auto-play progress on hover
    section.addEventListener('mouseenter', pauseProgress);
    section.addEventListener('mouseleave', resumeProgress);

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    section.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    section.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }

    // Initial render & progress start
    renderSlide(0);
    startProgress();
});

// Google Reviews Interactive Native Slider
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('grReviewsTrack');
    const prevBtn = document.getElementById('grPrevBtn');
    const nextBtn = document.getElementById('grNextBtn');
    const dotsContainer = document.getElementById('grSliderDots');
    const sliderContainer = document.querySelector('.gr-reviews-slider-container');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll('.gr-review-card'));
    if (!cards.length) return;

    let currentIndex = 0;
    let autoplayTimer = null;

    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function getMaxIndex() {
        const visible = getVisibleCardsCount();
        return Math.max(0, cards.length - visible);
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const maxIdx = getMaxIndex();
        const totalDots = maxIdx + 1;

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'gr-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `Yorum Sayfası ${i + 1}`);
            dot.addEventListener('click', () => {
                goToIndex(i);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const maxIdx = getMaxIndex();
        if (currentIndex > maxIdx) {
            currentIndex = maxIdx;
        }

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = window.innerWidth <= 768 ? 8 : (window.innerWidth <= 992 ? 20 : 20);
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // Update active dot
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.gr-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }
    }

    function goToIndex(index) {
        const maxIdx = getMaxIndex();
        currentIndex = Math.max(0, Math.min(index, maxIdx));
        updateSlider();
    }

    function nextSlide() {
        const maxIdx = getMaxIndex();
        if (currentIndex >= maxIdx) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    }

    function prevSlide() {
        const maxIdx = getMaxIndex();
        if (currentIndex <= 0) {
            currentIndex = maxIdx;
        } else {
            currentIndex--;
        }
        updateSlider();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Touch Swipe for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }

    // Handle Resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDots();
            updateSlider();
        }, 150);
    });

    // Initial call
    updateDots();
    updateSlider();
    startAutoplay();
});

// Developer Tools & Source Protection (F12, Ctrl+Shift+I, Right-Click Blockers)
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
    // Block F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // Block Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Select)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
    }
    // Block Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
    }
});


