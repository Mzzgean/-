// window.top  只读属性
document.onclick = function () {
    console.log(document.documentElement.scrollTop);
    console.log(document.body.scrollTop);

}
// 0 获取元素
var divTop = document.getElementById('top');
var totop = document.getElementById('totop');
// 1 当拖动滚动条的时候，当页面滚动出去的距离超过10px，设置top的类样式，显示回到顶部
// 1.1 注册页面的滚动事件
window.onscroll = function () {
    // 1.2 判断当前页面滚动出去的距离是否超过10px
    var scrollTop = getScroll().scrollTop;
    if (scrollTop >= 10) {
        // 1.3 设置top的类样式，显示回到顶部
        divTop.className = 'header fixed';
        totop.style.display = 'block';
    } else {
        divTop.className = 'header';
        totop.style.display = 'none';
    }
}
// 2 点击回到顶部，以动画的方式，让页面滚动出去的距离为0
var timerId = null;
totop.onclick = function () {
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(function () {
        var target = 0;
        var step = 10;
        var current = getScroll().scrollTop;

        if (current > target) {
            step = -Math.abs(step);
        }
        if (Math.abs(current - target) <= Math.abs(step)) {
            clearInterval(timerId);
            // 设置目标位置
            document.documentElement.scrollTop = target;
            document.body.scrollTop = target;
            return;
        }
        current += step;
        document.documentElement.scrollTop = current;
        document.body.scrollTop = current;
    }, 5);
}

//获取元素
//鼠标移到微信上 显示二维码
var weixin= document.getElementById('weixin');
var wma = document.getElementById('w-ma');
weixin.onmouseover = function () {
    wma.style.display = 'block';
}
weixin.onmouseout = function () {
    wma.style.display = 'none';
}

//微博二维码
var weibo = document.getElementById('weibo');
var bo = document.getElementById('w-bo');
weibo.onmouseenter = function () {
    bo.style.display = 'block';
}
weibo.onmouseout = function () {
    bo.style.display = 'none';
}
//qq
var qq = document.getElementById('qq');
var qqma = document.getElementById('qq-ma');
qq.onmouseenter = function () {
    qqma.style.display = 'block';
}
qq.onmouseout = function () {
    qqma.style.display = 'none';
}

//搜索  鼠标点击全部分类 显示隐藏部分
//1.获取元素
var partMain = document.getElementById('part-main');
var topCenter = document.getElementById('top-center');
var part = document.getElementById('part');
var flag = true;
//2.给全部分类注册点击事件
classify.onclick = function () {
    if(flag){
        partMain.style.display = 'block';
        flag = false;
    }else {
        partMain.style.display = 'none';
        flag = true;
    }
}
//点击搜索图标 跳出弹出框
//获取元素
var link = document.getElementById('link');
var searchTan = document.getElementById('search-tan');
var bg = document.getElementById('bg');
var closeBtn = document.getElementById('closeBtn');
var title = document.getElementById('title');
//1.点击link 显示bg和login
link.onclick = function () {
    bg.style.display = 'block';
    searchTan.style.display = 'block';
}
closeBtn.onclick = function (){
    bg.style.display = 'none';
    searchTan.style.display = 'none';
}
//2.给鼠标注册mousedown事件 当鼠标按下时可以拖拽盒子在,mousedown事件中注册mousemove事件
//2.1给title注册mousedown事件
title.onmousedown = function (e) {
    //2.4获取鼠标在title上按下的位置
    var downX = e.pageX;
    var downY = e.pageY;
    //2.5获取鼠标原来的位置
    var posX = searchTan.offsetLeft;
    var posY = searchTan.offsetTop;
    //2.1在mousedown事件中注册mousemove事件
    document.onmousemove = function (e) {
        //2.3获取鼠标移动后的坐标
        var moveX = e.pageX;
        var moveY = e.pageY;
        //2.6计算鼠标移动的距离
        var instanceX = moveX - downX;
        var instanceY = moveY - downY;
        //2.7计算终点坐标
        var targetX = instanceX + posX;
        var targetY = instanceY + posY;
        //3.限制事件写在mousemove里面 ,同时写在渲染上面 在渲染之前去判断一下,限制一下
        //3.1获取最小距离和最大距离
        var maxX = window.innerWidth - searchTan.offsetWidth - 30;
        var maxY = window.innerHeight - searchTan.offsetHeight ;
        //3.2判断是否在最大距离最小距离内
        if (targetX < 0) {
            targetX = 0 ;
        }
        if (targetX > maxX) {
            targetX = maxX ;
        }
        if (targetY > maxY) {
            targetY = maxY ;
        }
        if (targetY < 30) {
            targetY = 30 ;
        }
        searchTan.style.left = targetX + 340 + 'px';
        searchTan.style.top = targetY - 80 + 'px' ;
    }
}
//3.在mouseup中清除鼠标移动事件
document.onmouseup = function () {
    document.onmousemove = null;
}

