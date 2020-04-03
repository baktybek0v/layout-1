// слайдер Отзывов - сделан из 3 слоёв, section выступает как сама рамка
// testimonials или же блок slider выступает как длинная пленка, её ширина
// формируется из количество блоков * ширину дочерных элементов
// последний слой собственно сами элементы слайдера который занимает всю ширину родителя
// begin (слайдер Отзывов)

var slider = {
    addblock: document.querySelector('.section-testimonials'),
    band: document.querySelector('.section-testimonials .slider'),
    itemBlock: document.querySelectorAll('.section-testimonials .testimonials__item'),
    btnLeft: document.querySelector('.section-testimonials .btn-control.left'),
    btnRight: document.querySelector('.section-testimonials .btn-control.right'),
    indicator: document.querySelector('.section-testimonials .indicator'),
    indicatorItem: document.querySelectorAll('.section-testimonials .indicator-item')
};

function normalizeWidth () {
    var length = slider.itemBlock.length;
    for (var i = 0; i < length; i++)
    slider.itemBlock[i].style.width = slider.addblock.offsetWidth + 'px';
}
function getWidth () {
    return slider.addblock.offsetWidth;
}
function getWidthBand () {
    var widthBand = slider.addblock.offsetWidth * slider.itemBlock.length;
    slider.band.style.width = widthBand + 'px';
    return widthBand;
}

var dataSlide = 0;
window.addEventListener('load', function() {
    getWidthBand();
    normalizeWidth();
}, false);

window.addEventListener('resize', function() {
    normalizeWidth();
    getWidthBand();

    var i = 0;
    var length = slider.indicatorItem.length;
    for (; i < length; i++) {
        if (slider.indicatorItem[i].classList.contains('active')){
            var num = slider.indicatorItem[i].getAttribute('data-slide');
            num = parseInt(num);
            slider.band.style.right = num * getWidth() + 'px';
        }
    }
}, false);


slider.btnRight.onclick = function () {
    var i = 0;
    var length = slider.itemBlock.length;
    for (; i < length; i++) {
        slider.indicatorItem[i].classList.remove('active');
    }

    dataSlide = dataSlide + 1;

    if (dataSlide === length) {
        dataSlide = 0;
    }

    slider.band.style.right = (dataSlide * getWidth()) + 'px';
    slider.indicatorItem[dataSlide].classList.add('active');
}

slider.btnLeft.onclick = function () {
    var i = 0;
    var length = slider.itemBlock.length;
    for (; i < length; i++) {
        slider.indicatorItem[i].classList.remove('active');
    }

    dataSlide = dataSlide - 1;

    if (dataSlide === -1) {
        dataSlide = length - 1;
    }

    slider.band.style.right = (dataSlide * getWidth()) + 'px';
    slider.indicatorItem[dataSlide].classList.add('active');
}


// индикатор
slider.indicator.onclick = function(event) {
    if (event.target.hasAttribute('data-slide'))
    {
        var i = 0;
        var length = slider.itemBlock.length;
        dataSlide = event.target.getAttribute('data-slide');
        dataSlide = parseInt(dataSlide);

        for (; i < length; i++) {
            slider.indicatorItem[i].classList.remove('active');
        }

        slider.indicatorItem[dataSlide].classList.add('active');
        slider.band.style.right = (dataSlide * getWidth()) + 'px';
    }
}

// end (Слайдер Отзывов)


// так как я тег <br> использую только для того чтобы сделать перенос
// строк в desktop, я скрываю их при разрешение меньше 650 пикселей
// begin (hide br)
function resetCarryover() {
    var br = document.getElementsByTagName('br');
    var length= br.length;
    if (window.screen.width <= 650) {
          for (var i = 0; i < length; i++)
          br[i].classList.add('hide');
    }
    else  {
         for (var i = 0; i < length; i++)
         br[i].classList.remove('hide');
    }
}

function showCarryoverServices() {
    var services = document.querySelectorAll('.section-services br');
    var length = services.length;
    for (var i = 0; i < length; i++) {
        services[i].classList.remove('hide');
    }
}

window.addEventListener('load', function() {
    resetCarryover();
    showCarryoverServices();
}, false)

window.addEventListener('resize', function() {
    resetCarryover();
    showCarryoverServices();
}, false)

// end (hide br)


// адаптивный навигционный меню begin
var btnUncover = document.querySelector('.section-header .show-gamburger');

btnUncover.onclick = function () {
    var navbar = document.querySelector('.section-header .navbar');
    navbar.classList.toggle('navbarToggle');
    this.classList.toggle('white');
}
// адаптивный навигционный меню end


//scrollup который появляется когда проекрученная часть контента превышает
// на полтора раза высота девайса
// begin scrollup
var scrollup = document.querySelector('.scrollup');
var heightDevice = window.screen.height;

var timer;
var scrolled;

// функция который позволяет узнать на сколько было прокрученно страница о-но body

function getBodyScrollTop()
{
  return self.pageYOffset ||
    (document.documentElement && document.documentElement.scrollTop) ||
    (document.body && document.body.scrollTop);
}

// собственно само функция который показывает кнопку скрола
function scrollShow () {
    if (getBodyScrollTop() >= heightDevice) {
        scrollup.style.display = 'block';
    }
    else {
         scrollup.style.display = 'none';
    }
}

window.addEventListener('scroll', scrollShow, false);

scrollup.addEventListener('click', function() {
    scrolled = window.pageYOffset;
    scrollToTop();
}, false);

function scrollToTop () {
    if (scrolled > 0) {
        window.scrollTo(0, scrolled);
        scrolled -= 60;
        timer = setTimeout(scrollToTop, 10);
    }
    else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }
}
// end scrollup
