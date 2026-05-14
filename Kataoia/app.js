/* ========================================= */
/* ELEMENTS */
/* ========================================= */

const slides = document.querySelectorAll('.banner_slide');

const nextButton = document.getElementById('next_banner');

const pauseButton = document.getElementById('pause_banner');

const banner = document.querySelector('.banner_lg');

const transitionOverlay = document.querySelector('.banner_transition');


/* ========================================= */
/* VARIABLES */
/* ========================================= */

let currentSlide = 0;

let bannerInterval;

let isPaused = false;

const slideDelay = 6000;


/* ========================================= */
/* SHOW SLIDE */
/* ========================================= */

function showSlide(index){

    removeActiveSlides();

    slides[index].classList.add('active');

    animateTransition();

}


/* ========================================= */
/* REMOVE ACTIVE */
/* ========================================= */

function removeActiveSlides(){

    slides.forEach((slide) => {

        slide.classList.remove('active');

    });

}


/* ========================================= */
/* NEXT SLIDE */
/* ========================================= */

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}


/* ========================================= */
/* START AUTOPLAY */
/* ========================================= */

function startBanner(){

    bannerInterval = setInterval(() => {

        nextSlide();

    }, slideDelay);

}


/* ========================================= */
/* STOP AUTOPLAY */
/* ========================================= */

function stopBanner(){

    clearInterval(bannerInterval);

}


/* ========================================= */
/* TOGGLE PAUSE */
/* ========================================= */

function togglePause(){

    isPaused = !isPaused;

    if(isPaused){

        stopBanner();

        pauseButton.innerHTML = '▶';

    }else{

        startBanner();

        pauseButton.innerHTML = '⏸';

    }

}


/* ========================================= */
/* TRANSITION EFFECT */
/* ========================================= */

function animateTransition(){

    transitionOverlay.classList.add('active');

    setTimeout(() => {

        transitionOverlay.classList.remove('active');

    }, 900);

}


/* ========================================= */
/* HOVER PAUSE */
/* ========================================= */

function setupHoverPause(){

    banner.addEventListener('mouseenter', () => {

        stopBanner();

    });

    banner.addEventListener('mouseleave', () => {

        if(!isPaused){

            startBanner();

        }

    });

}


/* ========================================= */
/* EVENTS */
/* ========================================= */

function setupEvents(){

    nextButton.addEventListener('click', () => {

        stopBanner();

        nextSlide();

        if(!isPaused){

            startBanner();

        }

    });

    pauseButton.addEventListener('click', togglePause);

}


/* ========================================= */
/* INIT */
/* ========================================= */

function initBanner(){

    showSlide(currentSlide);

    startBanner();

    setupHoverPause();

    setupEvents();

}


initBanner();