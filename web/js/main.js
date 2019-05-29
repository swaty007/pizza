function updateBasketHTML(items) {
    items = items.sort(function (a,b) {
        return a.item_id > b.item_id
    });
    if (items.length <= 0) {
        $('#basket .basket-wrap-nav').hide();
        $('#basket-li-has-item').hide();
        $('#basket .empty-basket').show();
    } else {
        $('#basket .basket-wrap-nav').show();
        $('#basket-li-has-item').show();
        $('#basket .empty-basket').hide();
    }
    var total_amount = 0;
    var total_value = 0;
    $('#basket').find('.items').empty();
    $('#itemsli').empty();
    items.forEach(function (item, i, array) {
        total_amount += item.price*item.value;
        total_value += item.value;
        $('#itemsli').append('<tr><td>' + (item.name + ' ' + item.size) + 'см</td><td>' + item.price*item.value + 'грн</td><td>' + item.value + '<span class="close" onclick="deleteBasket('+item.item_id+')">x</span></td></tr>');
    });

    $('#basket').find('.price').text(total_amount);
    $('#basket').find('.position').text(items.length);
    $('#n_of_cur').text(items.length);
    $('#basket').find('.value').text(total_value);
    $('#total_amount').text(total_amount);
    console.log('Количество позиций',items.length);
    console.log('Количество товаров',total_value);
    console.log('Общая сума',total_amount);
}
function deleteBasket(item_id) {
    var data = {
        item_id: item_id
    };
    $.ajax({
        type: 'POST',
        url: '/web/site/delete-basket',
        data: data,
        success: function (res) {
            console.log(res);
            updateBasketHTML(Object.values(res.basket));
            if (res.status == true) {

            }
            if (res.status == false) {

            }
        }
    });
}

function setBasket(__this) {
    var _this = $(__this);
    var submitBtn = _this;
    var item_id = _this.attr('data-id');
    var name = _this.parents('.price-wrap').attr('data-name');
    var img = _this.parents('.item-block').find('img').attr('src');
    var price = _this.attr('data-price');
    var size = _this.attr('data-size');
    submitBtn.attr('disabled', 'disabled');//выключить повторное нажатие
    var data = {
        name: name,
        size: size,
        item_id: item_id,
        price: price,
        value: 1
    };


    var cssStyle = document.createElement('style');
    cssStyle.type = 'text/css';
    var rules = document.createTextNode(".border-effect{background-image:url('"+ img +"')}");
    cssStyle.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssStyle);

    _this.parents('.item-block').effect( 'transfer', { to: "#basket-effect", className: "border-effect" }, 700, function () {});
    $.ajax({
        type: 'POST',
        url: '/web/site/set-basket',
        data: data,
        success: function (res) {
            console.log(res);
            updateBasketHTML(Object.values(res.basket));
            if (res.status == true) {

            }
            if (res.status == false) {

            }
        }
    }).always(function () {
        submitBtn.removeAttr('disabled'); //включить кнопку
    });
}

window.addEventListener('DOMContentLoaded', function () {
    var filter_firm = {
        init: function () {
            $('#filter_items').on('click', 'input:checkbox', function () {
                filter_firm.filter();
            });
        },
        filter: function () {
            var type = [];
            $('#filter_items #type_filter input:checkbox:checked').each(function (i, elem) {
                type.push($(elem).val());
            });
            $('.item-block').filter(function (index) {
                    if (type && type.length > 0) {
                        if (type.indexOf($(this).attr('data-type')) <= -1) {
                            $(this).parent('div').hide(300);
                            return;
                        }
                    }
                    $(this).parent('div').show(300);
                    return;
            });
        }

    };
    filter_firm.init();

    // плавная прокрутка
    var menu_selector = "#type_filter ul"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню.
    function onScroll(){

        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a.scroll").each(function(){
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
                $(menu_selector + " a.active").removeClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    }


    $(document).on("scroll", onScroll);

    $("a.scroll").click(function(e){
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function(){
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });
    });
    // плавная прокрутка end
    $(window).scroll(function(){
        if (window.innerWidth > 768)
        {
            // var bo = $("body").scrollTop();
            var bo = $(window).scrollTop();
            var bo_top = 200 - bo;
            // console.log(bo);
            // $('.main-block').offset().top
            var bo_bot = $('.main-block').height() - 200;

            var width = $("#type_filter").parent('div.col-sm-12').width();
            if ( bo > 200 && bo < bo_bot ) {$("#type_filter").css({'top':50,'width':width,'position':'fixed'})}
            else if
               ( bo < 200 ||  bo > bo_bot) { $("#type_filter").css({'top':bo_top,'width':'auto','position':'static'})}
        } else {
            $("#type_filter").css({'top':0,'width':'auto','position':'static'});
        }
    });
});


window.addEventListener('load', function () {
    var styleJs = {
        heigth: 0,
        offer: function () {
            this.setHeigth($('#Популярные div.item-block'));
            this.setHeigth($('#Пицца div.item-block'));
            this.setHeigth($('#Напитки div.item-block'));
            this.setHeigth($('#Соусы div.item-block'));
            this.setHeigth($('#Салаты div.item-block'));
        },
        setHeigth: function (items) {
            this.heigth = 0;
            items.each(function () {
                if ($(this).outerHeight() > styleJs.heigth) {
                    items.css({minHeight: '0'});
                    styleJs.heigth = $(this).outerHeight();
                }
            });
            if (this.heigth > 0) {
                items.css({minHeight: this.heigth + 'px'});
            }
        }
    };
    $(window).resize(function () {
        styleJs.offer();
    });
    setTimeout(function () {
        styleJs.offer();
    },100);
    setTimeout(function () {
        styleJs.offer();
    },500);
});

