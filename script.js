/* ---- nav menu ---- */

function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('open');
}

/* ---- carousel ---- */

const carousel = document.getElementById('carousel');
const track = document.getElementById('track');
const dotBox = document.getElementById('dots');
const cSlides = track ? Array.from(track.children) : [];
let cIndex = 0;

function renderCarousel() {
  if (!cSlides.length) return;

  const slide = cSlides[cIndex];
  const offset = carousel.clientWidth / 2 - (slide.offsetLeft + slide.clientWidth / 2);
  track.style.transform = 'translateX(' + offset + 'px)';

  cSlides.forEach(function (s, i) {
    s.classList.toggle('is-active', i === cIndex);
  });

  Array.from(dotBox.children).forEach(function (d, i) {
    d.classList.toggle('on', i === cIndex);
  });
}

function moveSlide(step) {
  cIndex = (cIndex + step + cSlides.length) % cSlides.length;
  renderCarousel();
}

function goToSlide(i) {
  cIndex = i;
  renderCarousel();
}

if (cSlides.length) {
  cSlides.forEach(function (s, i) {
    const dot = document.createElement('button');
    dot.className = 'c-dot';
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.onclick = function () { goToSlide(i); };
    dotBox.appendChild(dot);
  });

  renderCarousel();
  window.addEventListener('resize', renderCarousel);
}
