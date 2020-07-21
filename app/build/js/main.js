$(document).ready(function () {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var $header = $('header');

    var $burger = $('.burger-wrp');

    var $popUpGeneralBlock = $('.pop-up-general-block');

    var $overlayPopUpWRP = $('.pop-up-overlay-wrapper');
    var $overlay = $('.overlay-pop-up');
    var $closePopUpBtn = $('.pop-up-general-block-close-btn');

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);


    // menu
    $('.burger').click(function () {
        $('.menu').toggleClass('active');
        $('header').toggleClass('active');
        $(this).toggleClass('active');
        $('body').toggleClass('active');
    });

    // animation
    new WOW().init();


    // MAIN SLIDER
    var $statusCurrent = $('.current-number');
    var $statusGeneral = $('.general-number');
    var $slickElement = $('.main-slider');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $statusCurrent.text('0' + i);
        $statusGeneral.text('0' + slick.slideCount);
    });
    $slickElement.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.main-rotate').addClass('rotate');
        $('.smile').addClass('animated bounce');
        setTimeout(function(){
          $('.main-rotate').removeClass('rotate');
          $('.smile').removeClass('animated bounce');
      }, 700);
    });

    $slickElement.slick({
        // autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.prev-main-arrow'),
        nextArrow: $('.next-main-arrow'),
        fade: true,
        dots: true,
        appendArrows: '.slider-nav',
        appendDots: '.slick-dots-wrp',
    });

    $('.instrument-slider1').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.prev-instrument1-arrow'),
        nextArrow: $('.next-instrument1-arrow'),
        dots: false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
              }
            },
        ]
    });
    $('.instrument-slider2').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.prev-instrument2-arrow'),
        nextArrow: $('.next-instrument2-arrow'),
        dots: false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
              }
            },
        ]
    });

    // slider card
    $('.card-slider-for').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         fade: true,
         asNavFor: '.card-slider-nav',

    });
    $('.card-slider-nav').slick({
         slidesToShow: 3,
         slidesToScroll: 1,
         asNavFor: '.card-slider-for',
         dots: false,
         // centerMode: true,
         focusOnSelect: true,
         prevArrow: $('.prev-card-arrow'),
         nextArrow: $('.next-card-arrow'),
    });

    // parallax
    if (windowWidth > 767) {
        $('.parallax-el').each(function (index, value) {
            var parallaxEl = $(this).attr('id', 'scene' + index);
            var scene = document.getElementById('scene' + index);
            var parallaxInstance = new Parallax(scene);
        });
    }
    // parallax end

    // map switch
    $('.btn-switch p').click(function () {
        var id = $(this).attr('data-line');
        $('.map-section-content').removeClass('active');
        $('.btn-switch p').removeClass('active');
        $(this).addClass('active');
        $('#' + id + '.map-section-content').addClass('active');
        // $('.map-section-content h2').toggleClass("animated fadeInUp");
        // $('.row-materik .col-12').toggleClass("animated fadeInUp");
        // $('.subtitle-materik').toggleClass("animated fadeInUp");
    })


    // soft scroll
    $(".scrollTo").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        var id  = $(this).attr('href');
        var top = $(id).offset().top;
        // анимируем переход к блоку, время: 500 мс
        $('body,html').animate({scrollTop: top}, 500);
        // находим высоту, на которой расположен блок
    });


    function headerChange () {
        if($window.scrollTop() > 50) {
            $header.addClass('fixed');
            $('.acc-list-fix-wrp').addClass('fixed');
        } else {
            $header.removeClass('fixed');
            $('.acc-list-fix-wrp').removeClass('fixed');
        }
    };
    headerChange ();
    $window.scroll(function () {
        headerChange ();
    });


    // only number
    $(".input-number").keypress(function(event){
      event = event || window.event;
      if (event.charCode && event.charCode!=0 && event.charCode!=8 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
        return false;
    });

    // masked
    $('.mask-phone').mask('+7 (999) 99-99-99');

    var flag = 1;
    $('.filter-btn').click(function () {
        if (flag == 1) {
            $('.filter-btn .btn-text').text('скрыть');
            flag = 0;
            $('.filters-list').addClass('active');
        } else {
            $('.filter-btn .btn-text').text('Фильтр');
            flag = 1;
            $('.filters-list').removeClass('active');
        }
    });






    // form checked
    $('.checkbox-check').change(function() {
       if(this.checked) {
           $(this).closest('form').find('.btn-4-checkbox').removeClass('btn-4-checkbox-disabled');
       }
       else {
           $(this).closest('form').find('.btn-4-checkbox').addClass('btn-4-checkbox-disabled');
       }
   });



    // POP-UPS
    // open reminder pop-up
    var $openReminderBTN = $('.open-reminder-btn');

    $openReminderBTN.click(function () {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#reminder').addClass('active');
    });

    // close pop-up
    $overlay.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });
    $closePopUpBtn.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });
});
