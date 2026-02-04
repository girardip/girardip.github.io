const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const controls = document.querySelectorAll('.control-button');

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
