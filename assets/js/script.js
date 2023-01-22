$(function () {

    // On Scroll Navbar
    $(window).on('load', function(){
        if ($(this).scrollTop() > $(".navbar").height()) {
            $(".navbar").addClass('scrolled')
        }

        if($('#cart').is(':visible')){
            $('#submit-order').addClass('d-none')
        }
    });

    $(window).scroll(function () {
        let nav = $(".navbar");
        nav.toggleClass('scrolled', $(this).scrollTop() > nav.height());
    });

    // toggle Cart
    $('#cart').on('mouseenter', function () {
        if (!$('#toggle-show').hasClass('show')) {
            $('#toggle-show').click();
            $('.body-overlay').removeClass('d-none')
        }
    })

    $('#cart').on('mouseleave', function () {
        if ($('#toggle-show').hasClass('show')) {
            $('#toggle-show').click()
            $('.body-overlay').addClass('d-none')
        }
    })

    // slick swiper
    $('.menu-items').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        // focusOnSelect: true,
        rtl: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Add for qty for price
    let add = $('.add-qty');
    let subtract = $('.subtract-qty');
    
    add.on('click', function (e) {
        e.preventDefault();
        let count = $(this).siblings('.quantity-count');
        let qty = parseInt(count.text());
        let price = $(this).parent('.quantity-input').siblings('.total-price').children().children('.net-price');

        count.text(qty + 1);
        let total = calcPrice(price.data('price'), parseInt(count.text()))
        price.text(total);
    })

    subtract.on('click', function (e) {
        e.preventDefault();
        let count = $(this).siblings('.quantity-count');
        let qty = parseInt(count.text());
        let price = $(this).parent('.quantity-input').siblings('.total-price').children().children('.net-price');

        if (qty !== 1) {
            count.text(qty - 1);
            $(this).removeAttr('disable')
        } else {
            $(this).attr('disable' , 'true')
        }

        let total = calcPrice(price.data('price'), parseInt(count.text()))
        price.text(total);
    })

    function calcPrice(price, qty) {
        let total = parseInt(price) * qty;
        return total;
    }

    // add product from modal to cart and show cart in mobile 
    $('.add-product-to-cart').on('click', function () {
        if (!$('#cart').is(':visible')) {
            $('#submit-order').removeClass('d-none')
            $('#add-product').modal('hide')
        }
    })

});