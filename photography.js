const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const controls = document.querySelectorAll('.control-button');
const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

let currentSlide = 0;
let slideshowTimer;

const setSlide = (index) => {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
};

const nextSlide = () => setSlide(currentSlide + 1);
const prevSlide = () => setSlide(currentSlide - 1);

const startSlideshow = () => {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(nextSlide, 6000);
};

controls.forEach((control) => {
  control.addEventListener('click', () => {
    const action = control.dataset.action;
    if (action === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
    startSlideshow();
  });
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    setSlide(index);
    startSlideshow();
  });
});

startSlideshow();

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || 'Expanded photograph';
  lightbox.classList.add('active');
  document.body.classList.add('no-scroll');
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('active');
  document.body.classList.remove('no-scroll');
  lightboxImage.src = '';
  lightboxImage.alt = '';
};

galleryImages.forEach((image) => {
  image.addEventListener('click', () => openLightbox(image));
});

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('active')) {
    closeLightbox();
  }
});
