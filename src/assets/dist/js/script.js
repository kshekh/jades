$(document).ready(function () {
    function init() {
        initFooter();
        initBar();
        initCollapse();
        initSlick();
        initColorBox();
       
        initLogin();
        initModal();
       
        initInfinityScroll();
        initCheckout();
        initUserNavMenu();
        closeMenu();
      
        
        

    }

    // const options = {
    //     cache: false,
    //     animationSelector: '[class*="swup-transition-"]',
    //     skipPopStateHandling: function(event) {
    //        return false
    //     }
    // };
    const options = {
        animateHistoryBrowsing: false,
        animationSelector: '[class*="swup-transition-"]',
        cache: false,
        skipPopStateHandling: function (event) {
            console.log(event.state);
            if (event.state && event.state.source === "swup") {
                return false;
            }
            return true;
        }
    };

    var swup = new Swup(options);
    initHeader();
    init();
    swup.on('contentReplaced', init);

    // header
    function initHeader() {
        initWishlist();
        hamburger();
        handleMainMenu();
        handleMenu();
        handleWindowResize();
        activeMenuCurrentPage();
        onDocumentClick();
    }

    function closeMenu() {
        $('html').removeClass('is-open-menu');
        $('.main-menu a').removeClass('active');
        var isDesktop = $(window).width() >= 768;
        if (isDesktop) {
            $('.sub-menu-wrapper').fadeOut().removeClass('active');
        } else {
            $('.sub-menu-wrapper').removeClass('active');
        }
        activeMenuCurrentPage();
    }

    function onDocumentClick() {
        $(document).mouseup((e) => {
            var isDesktop = $(window).width() >= 768;
            var container = $('.menu-item--has-child');
            if (isDesktop) {
                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    closeMenu();
                }
            }
        });
    }

    function hamburger() {
        $('.js-hamburger, .js-close-menu').on('click', function () {
            var isMobile = $(window).width() < 768;
            if (isMobile) {
                $('html').toggleClass('is-open-menu');
                var isMenuOpen = $('html').hasClass('is-open-menu');
                if (!isMenuOpen) {
                    $('.sub-menu-wrapper').removeClass('active');
                }
            }
        });
    }

    function activeMenuCurrentPage() {
        var isDesktop = $(window).width() >= 768;
        if (isDesktop) {
            var current = location.pathname;
            var $menus = $('.header-nav-inner > .main-menu > .menu-item > a');

            if (current && (current === '/' || current === 'html')) {
                $menus.eq(0).addClass('active'); // home
                return;
            }

            $menus.each(function () {
                var href = $(this).attr('href');
                if (href) {
                    var filter = new RegExp(current, 'i');
                    if (href.match(filter)) {
                        $(this).addClass('active');
                    }
                }
            });
        }
    }

    function handleMainMenu() {
        $('.header-nav-inner > .main-menu > .menu-item > a').on('click', function () {
            var isDesktop = $(window).width() >= 768;
            if (isDesktop) {
                $('.header-nav-inner > .main-menu > .menu-item > a').removeClass('active');
            }
        });
    }

    function handleMenu() {
        $('.menu-item--has-child a').on('click', function () {
            var isDesktop = $(window).width() >= 768;
            var isMenuMain = $(this).parent().hasClass('menu-item--main');
            var isActive = $(this).next().hasClass('active');

            if (isMenuMain) {
                $('html').addClass('is-open-menu');

                if (isActive && isDesktop) {
                    $(this).removeClass('active');
                    $(this).next().fadeOut().fadeOut();
                    $('.sub-menu-wrapper').fadeOut().removeClass('active');
                    $('html').removeClass('is-open-menu');
                    // active menu
                    var current = location.pathname;
                    var $menus = $('.header-nav-inner > .main-menu > .menu-item > a');
                    $menus.each(function () {
                        var $this = $(this);
                        if ($this.attr('href').indexOf(current) !== -1) {
                            $this.addClass('active');
                        }
                    });
                    return;
                }
            }

            if (isDesktop) {
                // remove active same level
                $(this).closest('ul').find('.sub-menu-wrapper').fadeOut().removeClass('active');
                $('.sub-menu-wrapper').prev().removeClass('active');

                // level2
                var $level2 = $(this).next();
                $level2.fadeIn().addClass('active');

                // // level3
                // var $level3 = $level2.find('.sub-menu-wrapper').eq(0);
                // $level3.fadeIn().addClass('active');
                //
                // // level4
                // var $level4 = $level3.find('.sub-menu-wrapper').eq(0);
                // $level4.fadeIn().addClass('active');
                //
                // // TODO: active first menu if no sub menu anymore

                // add class active to link for active state
                $('.sub-menu-wrapper.active').prev().addClass('active');

            } else {
                $(this).next().toggleClass('active');
            }
        });

        $('.sub-menu-close').on('click', function () {
            $(this).closest('.sub-menu-wrapper').toggleClass('active');
        });
    }

    function destroy() {
        $('html').removeClass('is-open-menu');
        $('.sub-menu-wrapper').removeClass('active');
    }

    function handleWindowResize() {
        $(window).resize(() => {
            var isDesktop = $(window).width() >= 768;
            if (isDesktop) {
                destroy();
            } else {
                $('.menu-item a').removeClass('active');
            }
        });
    }

    // footer
    function initFooter() {
        
    

        $('main').on('scroll', function () {
            var wS = $(this).scrollTop();
            if (wS > 740) {
                $('.js-go-top-page').addClass('active');
            } else {
                $('.js-go-top-page').removeClass('active');
            }
        });

        var isTouch = 'ontouchstart' in window;
        if (isTouch) {
            $('.js-footer').addClass('is-touch');
        }
    }
 

    // bar
    function initBar() {
        $('.js-bar-menu').on('click', function () {
            $('.js-bar-dropdown').slideToggle('fast');
            $(this).toggleClass('active');
        });
        goBackPage();
    }

    function goBackPage() {
        $('.js-back-page').on('click', function () {
            window.history.back();
        });
    }

    // slick
    function initSlick() {
        initHeroSlider();
        initBestSellerSlider();
        initProductDetailInfoSlider();
        initOtherPromotionSlider();
        handelWindowResize();

        setTimeout(() => {
            setPositionArrowSlider();
        }, 500);
    }

    function initHeroSlider() {
        var $hero = $('.hero').not('.slick-initialized');

        if ($hero.length) {
            $hero.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: $('.hero-slider').find('.slick-prev'),
                nextArrow: $('.hero-slider').find('.slick-next'),
            });
        }
    }

    function initBestSellerSlider() {
        var $bestSeller = $('.best-seller-slider, .recommended-slider').not('.slick-initialized');
        if ($bestSeller.length) {
            $bestSeller.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: $('.best-seller, .recommended-products').find('.slick-prev'),
                nextArrow: $('.best-seller, .recommended-products').find('.slick-next'),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }

    function initProductDetailInfoSlider() {
        var isMobile = $(window).width() < 1024;
        if (isMobile) {
            $('.product-detail-slider.slider-for')
                .not('.slick-initialized')
                .slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    infinite: false,
                    // asNavFor: '.slider-nav',
                    swipeToSlide: false,
                });

            $('.product-detail-slider.slider-nav')
                .not('.slick-initialized')
                .slick({
                    slidesToShow: 3,
                    // asNavFor: '.slider-for',
                    dots: false,
                    infinite: false,
                    swipeToSlide: false,
                    arrows: false,
                });

            $('.slider-nav').on('afterChange', function (event, slick, currentSlide, nextSlide) {
                const index = $(this).attr('data-slick-index');
                $('.slider-nav .slick-current').removeClass('slick-current');
                var inFocus = $(this).attr('data-slick-index');

                $('.slider-nav .slick-slide[data-slick-index="' + inFocus + '"]').addClass('slick-current');
                $('.product-detail-slider.slider-for').slick('slickGoTo', index);
            });

            $('.slider-nav .slick-slide').on('click', function (event, slick, direction) {
                const index = $(this).attr('data-slick-index');
                $('.slider-nav .slick-current').removeClass('slick-current');
                var inFocus = $(this).attr('data-slick-index');

                $('.slider-nav .slick-slide[data-slick-index="' + inFocus + '"]').addClass('slick-current');
                $('.product-detail-slider.slider-for').slick('slickGoTo', index);
            })
        }
    }

    function initOtherPromotionSlider() {
        // js-other-promotion-slider
        var $otherPromotionSlider = $('.js-other-promotion-slider').find('.other-promotions-slider').not('.slick-initialized');
        if ($otherPromotionSlider.length) {
            $otherPromotionSlider.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                prevArrow: $('.js-other-promotion-slider').find('.slick-prev'),
                nextArrow: $('.js-other-promotion-slider').find('.slick-next'),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }

    function handelWindowResize() {
        $(window).resize(() => {
            var isDesktop = $(window).width() >= 1024;
            if (isDesktop) {
                $(`.product-detail-slider.slider-for.slick-initialized,
                    .product-detail-slider.slider-nav.slick-initialized`
                ).slick('unslick');
            } else {
                initProductDetailInfoSlider();
            }
            setPositionArrowSlider();
        });
    }

    function setPositionArrowSlider() {
        // other promotion slider
        var $promotionSlider = $('.js-other-promotion-slider');
        if ($promotionSlider.length) {
            var container = $promotionSlider.find('.promotion__wrapper-image').eq(0).height();
            let top = `${(container / 2) - 30}px`;
            var width = $(window).width();
            if (width >= 768 && width < 1360) {
                top = `${(container / 2) + 40 - 32.5}px`; // 40 padding
            }
            if (width >= 1360) {
                top = `${(container / 2) + 80 - 32.5}px`; // 80 padding
            }
            $promotionSlider.find('.slick-action-wrapper').css('top', top);
        }
    }

    // collapse
    function initCollapse() {
        openCollapse();
        closeCollapse();
        handelColorSelected();
        handelSizeSelected();
        openLoginPanel();
        openLoginCheckOut();
    }

    function openCollapse() {
        $(document).on('click', '.js-open-collapse', function () {// $('.js-open-collapse').on('click', function () {
            $(this).next().addClass('active');
        });
    }

    function closeCollapse() {
        $('.js-close-collapse').on('click', function () {
            $(this).closest('.js-collapse, .js-collapse-login, .js-modal-checkout').removeClass('active');
            $('main').removeClass('is-open-collapse');
        });

        $(document).mouseup(() => {
            $('.js-collapse').removeClass('active');
            $('main').removeClass('is-open-collapse');
        });
    }

    function openLoginPanel() {
        $('.js-open-login-collapse').on('click', function () {
            $('.js-collapse-login').addClass('active');
            var isMobile = $(window).width() < 768;
            if (isMobile) {
                $('.js-pop-up-noti').slideUp().removeClass('active');
                var isMenuOpen = $('html').hasClass('is-open-menu');
                if (isMenuOpen) {
                    $('html').toggleClass('is-open-menu');
                }
            }
            $('main').addClass('is-open-collapse');
        });
    }

    function openLoginCheckOut() {
        $('.js-check-out').on('click', function () {
            $('.js-modal-checkout').addClass('active');
            $('main').addClass('is-open-collapse');
        });

        $('.js-login-button').on('click', function () {
            $(this).closest('.js-modal-checkout').removeClass('active');
            $('main').removeClass('is-open-collapse');
        });
    }

    function handelColorSelected() {
        var $colorItems = $('.js-select-color-collapse li');
        $colorItems.on('click', function () {
            $colorItems.removeClass('active');
            $(this).addClass('active');
            // change color
            var color = $(this).attr('data-color');
            var colorId = $(this).attr('data-colorId');
            const sku = $(this).attr('data-sku');

            console.log(sku);

            $('.js-color-selected').find('.color-box').css('background-color', color);
            $('.js-color-selected').find('.color-box').attr('data-colorId', colorId);
            // change name
            var name = $(this).attr('data-colorName');
            $('.js-color-selected').attr('data-colorId', colorId);
            $('.js-color-selected').find('span').text(name);

            // todo

            const size_id = $('.js-size-selected').attr('data-sizeId');
            const color_id = $('.js-color-selected').attr('data-colorId');
            getDetailProductBySku(sku, true);
            // updateSku(color_id, size_id);

        });
    }

    function handelSizeSelected() {

        var $sizeItems = $('.js-select-size-collapse div').not('[disabled]');
        $(document).on('click', '.js-select-size-collapse div', function () {
            console.log('asdasda clicl');
            $sizeItems.removeClass('active');
            $('.js-select-size-collapse div').removeClass('active');
            $(this).addClass('active');
            var size = $(this).attr('data-size');
            var sizeId = $(this).attr('data-sizeId');
            console.log('sizeId', $sizeItems);
            $('.js-size-selected').text(size).attr('data-sizeId', sizeId);
            const color_id = $('.js-color-selected').attr('data-colorId');
            const sku = $(this).attr('data-sku');
            getDetailProductBySku(sku);
            // updateSku(color_id, sizeId);
        });
    }

    // colorbox
    function initColorBox() {
        $(document).on('click', '.product-item__color li', function (e) {
            e.preventDefault();
            const colorId = $(this).find('a').attr('data-colorid');
            const sku = $(this).find('a').attr('data-sku');
            const masterProduct = $(this).find('a').attr('data-masterproductid');
            // const href = $(this).parents('.product-item').find('.product-item__link').attr('href');

            $(this).parents('.product-item').find('.product-item__link').attr("href", `/product/${masterProduct}/${sku}`);
            const coverImage = $(this).parents('.product-item').find('picture.default.cover-image');
            const priceItems = $(this).parents('.product-item').find('.product-item__price p');
            coverImage.removeClass('active');
            priceItems.removeClass('active');

            $(this).parents('.product-item').find('picture.default.cover-image[data-colorid=' + colorId + ']').addClass("active");
            $(this).parents('.product-item').find('.product-item__price p[data-colorid=' + colorId + ']').addClass("active");
            var $parent = $(this).closest('.product-item');
            $parent.find('li').removeClass('active');
            $(this).addClass('active');
        });
    }
 

    // login
    function initLogin() {
        openSignIn();
        openSignUp();
        openForgotPassword();
        openResetPassword();
    }

    function openSignUp() {
        $('.js-go-to-sign-up').on('click', function () {
            $('.js-login-container').fadeOut();
            $('.js-sign-up-container').fadeIn();
        });
    }

    function openSignIn() {
        $('.js-go-to-login').on('click', function () {
            $('.js-login-container').fadeIn();
            $('.js-sign-up-container').fadeOut();
        });
    }

    function openForgotPassword() {
        $('.js-go-to-forgot-password').on('click', function () {
            console.log('open forget password');
            $('.alert.forget_email.alert-error').text('');
            $('.alert.forget_email.alert-success').text('');
            $('.js-forgot-password-container').fadeIn();
            $('.js-login-container').fadeOut();
        });

        $('.js-cancel').on('click', function () {
            $('.js-forgot-password-container').fadeOut();
            $('.js-login-container').fadeIn();
        });
    }

    function openResetPassword() {
        // $('.js-reset-password').on('click', function () {
        //     console.log('click reset');
        //     // $('.js-reset-password-container').fadeIn();
        //     // $('.js-forgot-password-container').fadeOut();
        // });
    }

    // modal
    function initModal() {
        $('.js-open-how-modal').on('click', function () {
            $('#how-to-care').modal({
                fadeDuration: 1000,
                fadeDelay: 0.3,
                showClose: false
            });
        });

        $('.js-open-repair-modal').on('click', function () {
            $('#repair').modal({
                fadeDuration: 1000,
                fadeDelay: 0.3,
                showClose: false
            });
        });

        $('.js-open-add-to-car').on('click', function () {
            // add data
            var size = $('.js-size-selected').text();
            var color = $('.js-color-selected').find('span').text();
            var style = $('.js-color-selected').find('.color-box').css('background-color');
            var price = $('.product-price').attr('data-price');
            var amount = $('#amount').val();
            var total = Number(price) * amount;

            $('.js-product-size').text(size);
            $('.js-product-color').find('.product__color-box').css('background-color', style);
            $('.js-product-color').find('span').text(color);
            $('.js-product-price').text(`Â¥${parseInt(total).toLocaleString()}`);

            $('#add-to-car').modal({
                fadeDuration: 1000,
                fadeDelay: 0.3,
                showClose: false
            });


        });

        $('.js-open-add-to-car-detail').click(function (e) {
            e.preventDefault();
            var size = $('.js-size-selected').text();
            var color = $('.js-color-selected').find('span').text();
            var style = $('.js-color-selected').find('.color-box').css('background-color');
            var price = $('.product-price').attr('data-price');
            var amount = $('#amount').val();
            var total = Number(price) * amount;

            $('.js-product-price').text(`Â¥${parseInt(total).toLocaleString()}`);

            const size_id = $('.js-size-selected').attr('data-sizeId');
            const color_id = $('.js-color-selected').attr('data-colorId');
            const master_product_id = $(this).attr('data-masterProductId');
            const product_id = $(this).attr('data-productId');
            const sku = $('.product-code').attr('data-codeProduct');


            const qty = amount ? amount : 1;
            $('.js-product-size').text(size);
            $('.js-product-color').find('.product__color-box').css('background-color', style);
            $('.js-product-color').find('span').text(color);

            if (!$(this).attr('disabled')) {
                console.log('add to cart function');
                addToCart(product_id, master_product_id, sku, qty, size_id, color_id);
            }

        });

         
    }

    // scroll
    var scene;

    function initInfinityScroll() {
        var $infinityScroll = $('.js-infinity-scroll');
        if (!$infinityScroll.length) return;

        var controller = new ScrollMagic.Controller();
        // build scene
        scene = new ScrollMagic.Scene({
            triggerElement: '.js-infinity-scroll',
            triggerHook: 'onEnter'
        })
            .addTo(controller)
            .on('enter', () => {
                if (!$('.js-infinity-scroll').hasClass('active')) {
                    $('.js-infinity-scroll').addClass('active');
                    if (console) {
                        console.log('loading new items');
                    }
                    // simulate ajax call to add content using the function below
                    const paged = $('.js-infinity-scroll').attr('data-paged');
                    const lastPage = $('.js-infinity-scroll').attr('data-lastPage');
                    addBoxes(paged, lastPage);
                }
            });
    }

    function addBoxes(paged, lastPage) {
        var item = $('.js-infinity-scroll').attr('data-item');
        if (item) {

            setTimeout(() => {
                loadPromotions(paged);
            }, 500);

            $('.js-infinity-scroll').attr('data-paged', parseInt(paged) + 1);
            if (parseInt(lastPage) === parseInt(paged) + 1) {
                setTimeout(() => {
                    $('.lds-spinner-container').remove();
                }, 2000);
            }
            // Mock data on load more promotion
            // for (let index = 0; index < 2; index++) {
            //     $(getHtmlPromotionItem()).appendTo('.js-append-to');
            // }
        } else {
            setTimeout(() => {
                loadProduct(paged);
            }, 500);

            $('.js-infinity-scroll').attr('data-paged', parseInt(paged) + 1);
            if (parseInt(lastPage) === parseInt(paged) + 1) {
                setTimeout(() => {
                    $('.lds-spinner-container').remove();
                }, 2000);
            }

        }

        scene.update(); // make sure the scene gets the new start position
        $('.js-infinity-scroll').removeClass('active');
    }

    // checkout
    function initCheckout() {
        handleCheckoutBar();
        handleSelectPaymentMethod();
    }

    function handleCheckoutBar() {
        var $headline = $('.js-your-cart-headline');
        if ($headline.length) {
            for (let index = 0; index < $headline.length; index++) {
                var element = $headline[index];
                $(element).on('click', function () {
                    $(element).parent('.js-you-cart-info').toggleClass('active');
                    $(element).next('.js-your-cart-product').slideToggle().toggleClass('active');
                });
            }
        }
    }

    function handleSelectPaymentMethod() {
        $('.js-payment-method').on('click', function () {
            $('.js-payment-method').removeClass('active');
            $(this).addClass('active');
        });
    }

    // user nav menu
    function initUserNavMenu() {
        var $userNav = $('.js-user-nav-menu');
        if ($userNav.length) {
            var current = location.pathname;
            var $menus = $userNav.find('a');
            if (current) {
                $menus.each(function () {
                    var href = $(this).attr('href');
                    var filter = new RegExp(current, 'i');
                    if (href.match(filter)) {
                        $(this).addClass('active');
                    }
                });
            }
        }
    }

    // wishlist
    function initWishlist() {
        $(document).on('click', '.btn-fav-card', function (e) {
            // $('.btn-fav-card').click(function (e) {
            // e.preventDefault();
            console.log('.btn-fav-card');
            $(this).addClass('active');
            // find parent
            const $parent = $(this).closest('.product-item__info');
            if ($(this).hasClass('active')) {
                // find li active
                const $a = $parent.find('.product-item__color').find('li.active').find('a');
                $(this).attr("disabled", true);
                // get bg color
                const color_id = $a.attr('data-colorId');
                const product_id = $a.attr('data-productId');
                const master_product_id = $a.attr('data-masterProductId');
                const size_id = $a.attr('data-sizeId');
                const sku = $a.attr('data-sku');
                const user_id = $a.attr('data-user_id');
                const token = $('meta[name="csrf-token"]').attr('content');

                const color_id_button = $(this).attr('data-colorId');
                const product_id_button = $(this).attr('data-productId');
                const master_product_id_button = $(this).attr('data-masterProductId');
                const size_id_button = $(this).attr('data-sizeId');
                const sku_button = $(this).attr('data-sku');

                if (color_id && size_id) {
                    addWishList({product_id, master_product_id, name, size_id, color_id, user_id, sku}, token);
                } else {
                    addWishList({
                        product_id: product_id_button,
                        master_product_id: master_product_id_button,
                        name,
                        size_id: size_id_button,
                        color_id: color_id_button,
                        user_id: user_id,
                        sku: sku_button
                    }, token);
                }

            } else {

                // const wishListId = $(this).attr('data-buttonId');
                // removeWishlist(wishListId)
            }
        });

        $(document).ready(function () {
            $(document).on('click', '.js-add-to-wishlist', function (e) {
                e.preventDefault();

                if ($(this).hasClass('js-add-to-wishlist')) {
                    $(this).find('.btn-fav').toggleClass('active');
                    $(this).removeClass('js-add-to-wishlist');
                    $(this).attr('disabled', true);

                    if ($(this).find('.btn-fav').hasClass('active')) {
                        const token = $('meta[name="csrf-token"]').attr('content');
                        // const color_id = $('.color-box').attr('data-colorId');
                        // const size_id = $('.js-size-selected').attr('data-sizeId');
                        const name = $('.product-name').attr('data-productName');
                        // const product_id = $(this).attr('data-productid');
                        // const master_product_id = $(this).attr('data-masterProductId');
                        const user_id = $(this).attr('data-user_id');

                        const size_id = $('.js-size-selected').attr('data-sizeId');
                        const color_id = $('.js-color-selected').attr('data-colorId');
                        const master_product_id = $(this).attr('data-masterProductId');
                        const product_id = $(this).attr('data-productId');
                        const sku = $('.product-code').attr('data-codeProduct');

                        addWishList({product_id, name, size_id, color_id, user_id, master_product_id, sku}, token);
                    }
                }
            })
        });

        $(document).on('click', 'button.btn-remove.wihlist-page', function () {
            console.log('res');
        });
     
    }

    // reset login panel
    $(document).on('click', '.js-close-collapse-login', function () {
        $(
            '.js-login-container, .js-sign-up-container, .js-forgot-password-container, .js-reset-password-container'
        ).fadeOut();
        $('.js-login-container').fadeIn();
    });

    
});

 