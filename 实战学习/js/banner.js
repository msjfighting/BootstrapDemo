$(function () {
    var list = $('.jd_soilder li').length;
    // 获取ul中li的个数,显示小圆点
    var html = '';
    for (let i = 0; i < list; i++) {
        if (i == 0) {
            html += ' <span class="active" data-point='+i+'></span>';
        } else {
            html += ' <span class="" data-point=' + i +'></span>';
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
    var totalLiS = $('.jd_soilder li').length;
    // 给每个li添加偏移量
    $('.jd_soilder li').each((i,item) => {
        $(item).css('left', left + '%');
        left += 100;
        // 手动滑动的时候,根据index 设置left
        item.children[0].setAttribute('data-index', i);
    })
    // 动画时间
    time = $('.jd_soilder').data('sildertime');
    var currentIndex = 1;   
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
        currentIndex ++;        
        bannerAnimation();
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
                currentIndex = touchIndex + 1;
            }else{
                currentIndex = touchIndex -1;
            }  
        }
        bannerAnimation(true);
        interval = setInterval(animation, time);
    })
    // 点击圆点的位置
     var point = 0;
    $('.jd_point span').on('click',function (e) {
        point = parseInt(e.target.dataset.point);
        $('.jd_point span')[currentIndex - 1].setAttribute("class", "");
        $('.jd_point span')[point].setAttribute("class", "active");
        currentIndex = point + 1;
        $('.jd_soilder').css({
            'transform': 'translateX(-' + currentIndex * 100 + '%)',
            'transition': 'all 0.3s ease'
        });
    })
    // 无缝轮播图 下一页动画
    function bannerAnimation(prev){
        if (currentIndex == 0) {
            $('.jd_point span')[totalLiS - 3].setAttribute("class", "active");
            $('.jd_point span')[0].setAttribute("class", "");
        }else if (currentIndex == (totalLiS - 1)) {
            $('.jd_point span')[currentIndex - 2].setAttribute("class", "");
            $('.jd_point span')[0].setAttribute("class", "active");
        }else {
            if (prev) {
                $('.jd_point span')[touchIndex - 1].setAttribute("class", "");
                $('.jd_point span')[(touchIndex - 2)].setAttribute("class", "active");
            }else{
                $('.jd_point span')[currentIndex - 2].setAttribute("class", "");
                $('.jd_point span')[currentIndex - 1].setAttribute("class", "active");
            }
        }
        $('.jd_soilder').css({
            'transform': 'translateX(-' + currentIndex*100 + '%)',
            'transition': 'all 0.3s ease'
        });
        if (currentIndex == totalLiS - 1 || currentIndex == 0) {
            if (currentIndex == 0) {
                currentIndex = totalLiS - 2;
            } else {
                currentIndex = 1;
            }
            // 最后一次过渡动画结束后,将定位设置为从li数组第二个位置开始.并去除动画.
            // 绑定之前,显示的图片是放置在li最后一个位置的第一张图片,绑定函数之后,将定位改为li中真实的图片定位(即li中第二个位置的图片)
            $('.jd_soilder').on('transitionend webkitTransitionEnd', function (e) {
                $('.jd_soilder').css({
                    'transform': 'translateX(-' + currentIndex * 100 + '%)',
                    'transition': 'none'
                });
                // 接触绑定的事件
                $('.jd_soilder').off('transitionend webkitTransitionEnd');
            });
        }
    }
})