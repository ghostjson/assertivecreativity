(function ($) {
    "use strict";

    // Sticky menu
    var $window = $(window);
    $window.on('scroll', function () {
        var scroll = $window.scrollTop();
        if (scroll < 300) {
            $(".sticky").removeClass("is-sticky");
        } else {
            $(".sticky").addClass("is-sticky");
        }
    });


    // tooltip active js
    $('[data-toggle="tooltip"]').tooltip();


    // Hero main slider active js
    $('.hero-slider-active').slick({
        autoplay: false,
        fade: false,
        dots: false,
        arrows: false,
        centerMode: true,
        centerPadding: '18%',
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    centerPadding: '10%',
                }
            },
            {
                breakpoint: 1499,
                settings: {
                    arrows: false,
                    centerMode: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: false,
                }
            }
        ]
    });

    // Hero main slider home 3 active js
    $('.hero-slider-active-2').slick({
        autoplay: false,
        fade: false,
        dots: false,
        arrows: false,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next right"><i class="fa fa-angle-right"></i></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
            }
        }]
    });

    // Hero main slider active js
    $('.hero-slider-active-4').slick({
        autoplay: false,
        fade: false,
        arrows: false,
        slidesToShow: 4,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next right"><i class="fa fa-angle-right"></i></button>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                }
            }
        ]
    });

    // prodct details slider active
    $('.product-large-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        asNavFor: '.pro-nav'
    });


    // product details slider nav active
    $('.pro-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-large-slider',
        centerMode: true,
        centerPadding: 0,
        arrows: false,
        focusOnSelect: true
    });

    // product slider active js
    $('.gemma-slick-slider').slick();


    // nice select active js
    $('select').niceSelect();


    // image zoom effect
    $('.img-zoom').zoom();


    // Countdown Activation
    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">Days</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hrs</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Min</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Sec</span></div>'));
        });
    });

    /*Variables*/
    var $offCanvasNav = $('.mobile-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function (e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('icon-show');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('icon-show');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });


    // Off Canvas Open close
    $(".off-canvas-btn").on('click', function () {
        $(".off-canvas-wrapper").addClass('open');
    });

    $(".btn-close-off-canvas,.off-canvas-overlay").on('click', function () {
        $(".off-canvas-wrapper").removeClass('open');
    });


    // pricing filter
    var rangeSlider = $(".price-range"),
        amount = $("#amount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            amount.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    amount.val(" $" + rangeSlider.slider("values", 0) +
        " - $" + rangeSlider.slider("values", 1));


    // product view mode change js
    $('.product-view-mode a').on('click', function (e) {
        e.preventDefault();
        var shopProductWrap = $('.shop-product-wrap');
        var viewMode = $(this).data('target');
        $('.product-view-mode a').removeClass('active');
        $(this).addClass('active');
        shopProductWrap.removeClass('grid-view list-view').addClass(viewMode);
    })


    // quantity change js
    $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
    $('.pro-qty').append('<span class="inc qtybtn">+</span>');
    $('.qtybtn').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });


    // Checkout Page accordion
    $("#create_pwd").on("change", function () {
        $(".account-create").slideToggle("100");
    });

    $("#ship_to_different").on("change", function () {
        $(".ship-to-different").slideToggle("100");
    });


    // Payment Method Accordion
    $('input[name="paymentmethod"]').on('click', function () {
        var $value = $(this).attr('value');
        $('.payment-method-details').slideUp();
        $('[data-method="' + $value + '"]').slideDown();
    });


    // Mailchimp for dynamic newsletter
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'https://company.us19.list-manage.com/subscribe/post?u=2f2631cacbe4767192d339ef2&amp;id=24db23e68a'

    });


    // mailchimp active js
    function mailChimpResponse(resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);

        } else if (resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }
    }

    // User Changeable Access
    var activeId = $("#instafeed"),
        myTemplate = '<div class="instagram-item"><a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a><div class="instagram-hvr-content"><span class="tottallikes"><i class="fa fa-heart"></i>{{likes}}</span><span class="totalcomments"><i class="fa fa-comments"></i>{{comments}}</span></div></div>';

    if (activeId.length) {
        var userID = activeId.attr('data-userid'),
            accessTokenID = activeId.attr('data-accesstoken'),

            userFeed = new Instafeed({
                get: 'user',
                userId: userID,
                accessToken: accessTokenID,
                resolution: 'standard_resolution',
                template: myTemplate,
                sortBy: 'least-recent',
                limit: 15,
                links: false
            });
        userFeed.run();
    }

    // Instagram feed carousel active
    $(window).on('load', function () {
        var instagramFeed = $(".instagram-carousel");
        instagramFeed.imagesLoaded(function () {
            instagramFeed.slick({
                slidesToShow: 6,
                slidesToScroll: 2,
                dots: false,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
                responsive: [{
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    }
                ]
            })
        });
    })

    // google map
    var map_id = $('#map_content');
    if (map_id.length > 0) {
        var $lat = map_id.data('lat'),
            $lng = map_id.data('lng'),
            $zoom = map_id.data('zoom'),
            $maptitle = map_id.data('maptitle'),
            $mapaddress = map_id.data('mapaddress'),
            mymap = L.map('map_content').setView([$lat, $lng], $zoom);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map',
            maxZoom: 18,
            id: 'mapbox.streets',
            scrollWheelZoom: false,
            accessToken: 'pk.eyJ1Ijoic2hha2lsYWhtbWVlZCIsImEiOiJjamk4anF6NDgwMGd5M3BwM2c4eHU5dmIzIn0.yBLGUAB8kV1I1yGGonxzzg'
        }).addTo(mymap);

        var marker = L.marker([$lat, $lng]).addTo(mymap);
        marker.bindPopup('<b>' + $maptitle + '</b><br>' + $mapaddress).openPopup();
        mymap.scrollWheelZoom.disable();
    }

    // scroll to top
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.scroll-top').removeClass('not-visible');
        } else {
            $('.scroll-top').addClass('not-visible');
        }
    });
    $('.scroll-top').on('click', function (event) {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });

}(jQuery));