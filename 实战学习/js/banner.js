$(function () {
    var list = $('.jd_soilder li').length;
    // 获取ul中li的个数,显示小圆点
    var html = '';
    for (let i = 0; i < list; i++) {
        if (i == 0) {
            html += ' <span class="active" index='+i+'></span>';
        } else {
            html += ' <span class="" index=' + i +'></span>';
        }    
    }
    // 设置圆点
    $('.jd_point').html(html);
    
    var left = 0;
    // 复制第一张图片放在最后位置
    var firstLi = $('.jd_soilder li')[0].cloneNode(true);
    $('.jd_soilder').append(firstLi);
//   复制最后一张图片放在第一个位置
    var endLi = $('.jd_soilder li')[(list -1)].cloneNode(true);
    $('.jd_soilder').prepend(endLi);


    // 获取图片个数
    var list = $('.jd_soilder li').length;
    // 给每个li添加偏移量
    $('.jd_soilder li').each((i,item) => {
        $(item).css('left', left + '%');
        left += 100;
        // 手动滑动的时候,根据index 设置left
        item.children[0].setAttribute('data-index', i);
    })
    // 动画时间
    time = $('.jd_soilder').data('sildertime');
    var test = -100;   // 从li数组中第二个图片开始
    var index = 1;   
    var interval = null;//计时器
    //启动计时器函数
    function start() {
        if (interval != null) {//判断计时器是否为空
            clearInterval(interval);
            interval = null;
        }
        interval = setInterval(animation, time);//启动计时器，调用animation函数，
    }
    // 注册事件 并触发
    $(window).on('start', start).trigger('start');
    // 无缝轮播函数
    function animation() {
        test -= 100;
        index ++;        
        if (index == (list - 1)) {
            $('.jd_point span')[index-2].setAttribute("class", "");
            $('.jd_point span')[0].setAttribute("class", "active"); 
        }else{
            $('.jd_point span')[index - 2].setAttribute("class", "");
            $('.jd_point span')[index -1].setAttribute("class", "active");
        }
        $('.jd_soilder').css({
            'transform': 'translateX(' + test + '%)',
            'transition': 'all 0.3s ease'
        });
        if (index == list -1) {
            test = -100;
            index = 1;
            // 最后一次过渡动画结束后,将定位设置为从li数组第二个位置开始.并去除动画.
            // 绑定之前,显示的图片是放置在li最后一个位置的第一张图片,绑定函数之后,将定位改为li中真实的图片定位(即li中第二个位置的图片)
            $('.jd_soilder').on('transitionend webkitTransitionEnd', function (e) {
                $('.jd_soilder').css({
                    'transform': 'translateX(' + test + '%)',
                    'transition': 'none'
                });
                // 接触绑定的事件
                $('.jd_soilder').off('transitionend webkitTransitionEnd');
            });   
        }
    }  
    // 轮播图支持手动滑动
    // 1.获取手指在元素上滑动的方向
    // 1.1注册滑动事件 手指开始时的坐标x 结束触摸的坐标
    var startX = 0;
    var endX = 0;
    var offset = 20;
    var touchIndex = 0;
    $('.jd_soilder').on('touchstart', function (e) {
        clearInterval(interval);
        startX = e.originalEvent.touches[0].clientX;        
        touchIndex = parseInt(e.target.dataset.index);
    })
    $('.jd_soilder').on('touchend', function (e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        // 2.根据方向显示图片
        var distance = Math.abs(endX - startX);
        if (distance >= offset) {
            // 有方向变化 this防止多轮播图同时滑动问题
            // startX > endX ? '下一页' : '上一页';
            if (startX > endX) {
                var temp = touchIndex + 1;
                     index = temp;
                if (temp == list - 1) {
                    $('.jd_point span')[(touchIndex - 1)].setAttribute("class", "");
                    $('.jd_point span')[0].setAttribute("class", "active");
                    $(this).css({
                        'transform': 'translateX(-' + temp * 100 + '%)',
                        'transition': 'all 0.3s ease'
                    });
                    $(this).on('transitionend webkitTransitionEnd', function (e) {
                        test = -100;
                        index = 1;
                        $(this).css({
                            'transform': 'translateX(-100%)',
                            'transition': 'none'
                        });
                        // 接触绑定的事件
                        $(this).off('transitionend webkitTransitionEnd');
                    }); 
                      
                }else{
                    test = -temp * 100;
                    $('.jd_point span')[(touchIndex - 1)].setAttribute("class", "");
                    $('.jd_point span')[(touchIndex)].setAttribute("class", "active");
                    $(this).css({
                        'transform': 'translateX(-' + temp*100+'%)',
                        'transition': 'all 0.3s ease'
                    });
                }
            }else{
                var temp = touchIndex -1;
                    index = temp;
                if (temp == 0) {
                    var ins = parseInt(list - 3);
                    $('.jd_point span')[ins].setAttribute("class", "active");
                    $('.jd_point span')[0].setAttribute("class", "");
                    $(this).css({
                        'transform': 'translateX(0)',
                        'transition': 'all 0.3s ease'
                    });
                    $(this).on('transitionend webkitTransitionEnd', function (e) {
                        index = (list - 2);
                        test = -(list - 2)*100;
                        $(this).css({
                            'transform': 'translateX(-' + (list -2)*100+'%)',
                            'transition': 'none'
                        });
                        // 接触绑定的事件
                        $(this).off('transitionend webkitTransitionEnd');
                    });
                } else {
                    $('.jd_point span')[temp].setAttribute("class", "");
                    $('.jd_point span')[(temp -1)].setAttribute("class", "active");
                    $(this).css({
                        'transform': 'translateX(-' + temp * 100 + '%)',
                        'transition': 'all 0.3s ease'
                    });
                    test = -temp * 100;
                }
            }  
        }
        interval = setInterval(animation, time);
    })
})