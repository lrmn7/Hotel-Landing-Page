const header = document.querySelector('#header-section');
const logo = header.querySelector('.logo a');
const nav = document.querySelector('.nav');
const menu = nav.querySelector('.menu');
const menuLinks = menu.querySelectorAll('a');
const menuBar = document.querySelector('.toggle-menu');
const upArrow = document.querySelector('.page-up a');
const cards = document.querySelectorAll('.fade-in');
const page = document.querySelector('#home');
const about = document.querySelector('#about');
const body = document.querySelector('body');
const loaders = document.querySelector('.preloader');
const form = document.querySelector('.form');

// change header background color on scroll
const showBg = () => {
  const scroll = window.scrollY;

  if (scroll > 200) {
    header.classList.add('showBg');
    logo.classList.add('color');
    menuBar.classList.add('colorBlack');
  } else {
    header.classList.remove('showBg');
    logo.classList.remove('color');
    menuBar.classList.remove('colorBlack');
  }
};

// NAV BAR
menuBar.addEventListener('click', () => {
  nav.classList.toggle('showMenu');
  let closeBar = menuBar.querySelector('i');
  closeBar.classList.toggle('showMenu');
  closeBar.classList.toggle('colorWhite');
  document.body.classList.toggle('fixed');
});

// NAV LINKS
menuLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// FOR HOME AND ABOUT SECTION
const galleryFun = () => {
  // GALLERY SECTION
  const modal = document.querySelector('#modal');
  const preview = document.querySelectorAll('.gallery img');
  const original = document.querySelector('.full-img');
  const caption = document.querySelector('.caption');

  preview.forEach((preview) => {
    preview.addEventListener('click', () => {
      modal.classList.add('show');
      original.classList.add('open');
      const originalSrc = preview.getAttribute('data-original');
      original.src = originalSrc;
      const altText = preview.alt;
      caption.textContent = altText;
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
      modal.classList.remove('show');
      original.classList.remove('open');
    }
  });
};

// SLIDER FUNCTION FOR THE HOME SECTION
if (body === page) {
  // // PRELOADER
  const inti = () => {
    setTimeout(() => {
      loaders.style.pointerEvent = 'none';
      loaders.style.opacity = 0;
      setTimeout(() => (loaders.style.zIndex = 0), 1000);
    }, 3000);
  };

  inti();

  const slider = document.querySelector('.slider__container');
  const slides = Array.from(slider.children);
  const slideSize = slides[0].getBoundingClientRect().width;
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let auto = true;
  let slideTime = 7000;
  let slideInterval;

  const reset = () => {
    slides.forEach((slide, index) => {
      slide.style.left = `${slideSize * index}px`;
    });

    slides[0];
  };

  reset();

  // move slide
  const moveSlide = () => {
    slider.style.transform = `translateX(-${currentSlide * slideSize}px)`;
  };

  // next slide
  const nextSlide = () => {
    currentSlide++;

    if (currentSlide > slides.length - 1) {
      currentSlide = 0;
    }

    if (auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideTime);
    }

    moveSlide();
  };

  // next slide
  const prevSlide = () => {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    if (auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideTime);
    }

    moveSlide();
  };

  // auto slide
  if (auto) {
    slideInterval = setInterval(nextSlide, slideTime);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // GALLERY FUNCTION FOR THE HOME SECTION
  galleryFun();
}

// GALLERY FUNCTION FOR THE ABOUT SECTION
if (body === about) {
  galleryFun();
}

if (body === page || body === about) {
  // countdown timer
  const countDown = () => {
    const releaseDate = new Date('October 20, 2023 00:00:00').getTime();
    const presentDate = new Date().getTime();
    const gap = releaseDate - presentDate;

    //calculate time
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;

    const dayText = Math.floor(gap / day);
    const hourText = Math.floor((gap % day) / hour);
    const minuteText = Math.floor((gap % hour) / minute);
    const secondText = Math.floor((gap % minute) / second);

    document.querySelector('.day').textContent = dayText;
    document.querySelector('.hour').textContent = hourText;
    document.querySelector('.minute').textContent = minuteText;
    document.querySelector('.second').textContent = secondText;
  };

  setInterval(countDown, 1000);
}

// FORM CONTROL
if (body === form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

// CARDS
// fade in options
cardOptions = {
  threshold: 0,
  rootMargin: '0px 0px -120px 0px',
};

// fade in cards
const showCardsOnScroll = new IntersectionObserver(function (
  entries,
  showCardsOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      showCardsOnScroll.unobserve(entry.target);
    }
  });
},
cardOptions);

cards.forEach((card) => {
  showCardsOnScroll.observe(card);
});

// show goToTop arrow on scroll
const pageUp = () => {
  const scroll = window.scrollY;

  if (scroll > 1300) {
    upArrow.classList.add('showArrow');
  } else {
    upArrow.classList.remove('showArrow');
  }
};

// EVENT LISTENERS
window.addEventListener('scroll', showBg);
window.addEventListener('scroll', pageUp);
