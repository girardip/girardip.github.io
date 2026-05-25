const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
const lightboxNext = lightbox?.querySelector('.lightbox-next');

let currentIndex = 0;

const showImage = (index) => {
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentIndex];
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt || 'Expanded photograph';
};

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage) return;
  showImage(galleryImages.indexOf(image));
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
lightboxPrev?.addEventListener('click', () => showImage(currentIndex - 1));
lightboxNext?.addEventListener('click', () => showImage(currentIndex + 1));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('active')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});

// Highlight the nav link for whichever section is in view
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.collection');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((l) => l.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${entry.target.id}"]`)?.classList.add('active');
    }
  });
}, {
  // Fire when the section header crosses the upper 20% of the viewport
  rootMargin: '-15% 0px -75% 0px',
});

sections.forEach((section) => sectionObserver.observe(section));
