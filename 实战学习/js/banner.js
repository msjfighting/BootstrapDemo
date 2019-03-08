$(function () {
    // 获取屏幕的宽度
    var windowWidth = $(window).width();
    // 获取ul中li的个数,显示小圆点
    var html = '';
    var left = 0;
    $('.jd_soilder li').each((i,item) => {
        if (i == 0){
            html += ' <span class="active"></span>';
        }else{
            html += ' <span class=""></span>';
        }
        $(item).css('left', left+'%');
        left -= 100;
    })
    $('.jd_point').html(html)
    // 将第一张图片放在最后一张
    $('.jd_soilder').append($('.jd_soilder li').get(0));
    var list = $('.jd_soilder li').length;
    // 动画时间
    time = $('.jd_soilder').data('sildertime');
    var test = 0
    var index = 0;
   
    var t = window.setInterval(function () {
        ani()
    }, 4000);

    function ani() {
        if (index == list) {
            test = 0;
        }
        $('.jd_soilder').css({
            'transform': 'translateX(' + test + '%)',
            'transition': 'all 0.3s ease 0s'
        });
        index ++;
        test -= 100; 
    }


})
