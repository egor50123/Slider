import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper'
Swiper.use( [Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation] )

import { gsap, Power2 } from 'gsap'

document.addEventListener('DOMContentLoaded', () => {

  const swiperIMG = new Swiper('.slider-img', {
    loop: false,
    speed: 2400,
    parallax: true,
    pagination: {
      el: ".slider-counter__total",
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return `0${total}`
      }
    }
  })

  const swiperText = new Swiper('.slider-text', {
    loop: false,
    speed: 2400,
    mousewheel: {
      invert: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })

  swiperIMG.controller.control = swiperText
  swiperText.controller.control = swiperIMG

  let gear = document.querySelector('.slider-gear')

  swiperText.on('slideNextTransitionStart', function() {
    gsap.to(gear, 2.8, {
      rotation: '+=40',
      ease: Power2.easeOut
    })
  })

  swiperText.on('slidePrevTransitionStart', function() {
    gsap.to(gear, 2.8, {
      rotation: '-=40',
      ease: Power2.easeOut
    })
  })

  let curnum = document.querySelector('.slider-counter__current');
  let pagecur = document.querySelector('.slider-number__num');

  swiperText.on('slideChange', function(){
    let ind = swiperText.realIndex + 1
    gsap.to(curnum, .2, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: Power2.easeOut,
      onComplete: function() {
        gsap.to(curnum, .1, {
          force3D: true,
          y: 10
        })
        curnum.innerHTML = `0${ind}`,
        pagecur.innerHTML = `0${ind}`
      }
    })

    gsap.to(curnum, .2, {
      force3D: true,
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
      delay: .3
    })
  })
})

const CLASS_LIST = {
  MODAL: 'modal',
  MODAL_ACTIVE: 'modal--active',
  MODAL_CONTENT: 'modal__content',
  TRIGGER_OPEN: 'js-open',
  TRIGGER_CLOSE: 'js-close'
}

document.addEventListener('click', (event) => {
  let close = event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`);
  let modalContent = document.querySelector('.modal__content');

  if(event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
    event.preventDefault();

    const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
    const modalId = target.getAttribute('href').replace('#', '');
    const modal = document.getElementById(modalId);

    modal.classList.add(CLASS_LIST.MODAL_ACTIVE);

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = paddingValue;

  }

  if (event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
      event.target.classList.contains(CLASS_LIST.MODAL_ACTIVE)) {

      const modal = event.target.closest(`.${CLASS_LIST.MODAL}`)
      modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);

      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = 0;
  }
})

const paddingValue = window.innerWidth - document.querySelector('body').clientWidth + 'px'
console.log(paddingValue)