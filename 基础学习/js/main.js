$(function () {

    // 根据屏幕宽度的变化决定轮播图片应该展示什么
    function resize() {
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;
        $('#main_ad > .carousel-inner > .item').each(function (i, item) {
            var $item = $(item);// 取到的为dom对象,需要转换
            var imgSrc = isSmallScreen ? 'img-xs' : 'img-lg';
            // 设置背景图片需要使用url()
            // 因为需要小图时,尺寸等比例变化,所以小图时我们使用img标签
            // $element.data() 用于取元素上自定义属性(data-xxx)
            $item.css('backgroundImage', 'url("' + $item.data(imgSrc) + '")');
            if (isSmallScreen) {
                $item.html('<img src="' + $item.data(imgSrc) +'" alt=""/>')
            }else{
                $item.empty();
            }
        });
    }
    // 注册事件 并触发
    $(window).on('resize',resize).trigger('resize');
    // 初始化Tooltips插件
    $('[data-toggle="tooltip"]').tooltip();

   
   function scroll() {
       // 控制标签宽度
       var $ulContaniner = $('.nav-tabs');
       // 获取所有子元素的宽度和
       var width = 30; // ul上有padding-left
       $ulContaniner.children().each((index, element) => {
           width += element.clientWidth;
       });
       // 判断当前ul的宽度是否超出屏幕,如果超出就显示横向滚动条
       var windowWidth = $(window).width();
       if (width > windowWidth) {
           $ulContaniner.css('width', width).parent().css('overflow-x', 'scroll');
       } else {
           $ulContaniner.css('width', width).parent().css('overflow-x', '');
       }
   }
    // 注册事件 并触发
    $(window).on('scroll', scroll).trigger('scroll');

    var $newtitle = $('.news-title');
    $('#news .nav-stacked a').on('click',function () {
        // 获取当前点击元素
        var $this = $(this);
        // 获取对应的title
        var title = $this.data('title');

        // 将title设置到相应位置
        $newtitle.text(title);
    })


    // 轮播图支持手动滑动
    // 1.获取手指在元素上滑动的方向
    var $cayousels = $('.carousel');
    // 1.1注册滑动事件 手指开始时的坐标x 结束触摸的坐标
    var startX = 0;
    var endX = 0;
    var offset = 20;
    $cayousels.on('touchstart',function (e) {
        startX = e.originalEvent.touches[0].clientX;     
    })
    $cayousels.on('touchend', function (e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        // 2.根据方向显示图片
        var distance = Math.abs(endX - startX);
        // 3.使用Bootstrap组件方法 .carousel('prev') .carousel('next')
        if (distance >= offset) {
            // 有方向变化 this防止多轮播图同时滑动问题
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    })
   
    

})