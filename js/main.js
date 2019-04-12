//0.获取元素
var bannerBox = document.getElementById('banner-box');
var screenBanner = bannerBox.children[0];
var ul = screenBanner.children[0];

var ol = screenBanner.children[1];
var links = ul.children;

var arrBanner = bannerBox.children[1];
var left = arrBanner.children[0];
var right = arrBanner.children[1];

//定时器时间间隔
var intervalTime = 3000;
//获取图片宽度
var imgWidth = screenBanner.offsetWidth;
//1.鼠标移入box 显示arr
//1.1给鼠标注册mouseenter事件
bannerBox.onmouseenter = function () {
    arrBanner.style.display = 'block';
    //鼠标进入 清除定时器
    clearInterval(timeId);
}
//1.2鼠标离开 arr隐藏
bannerBox.onmouseleave = function () {
    arrBanner.style.display = 'none';
    //鼠标离开 开启定时器
    timeId = setInterval(function () {
        right.click();
    }, intervalTime);
}
//2.添加ol中的li
//2.1 ul中的li与ol中的li个数是一样的 获取ul中li的个数
var count = ul.children.length;
for (i = 0; i < count; i++) {
    var li = document.createElement('li');
    ol.appendChild(li);
    // setInnerText(li, i + 1);
    //记录下标
    li.index = i;
    //3.点击小数字也就是ol中的li 显示对应的图片
    //3.1 获取li 给每个li注册点击事件记录下标
    li.onclick = liLick;
    //3.4让第一张默认高亮
    if (i === 0) {
        li.className = 'current';
    }
    //3.2 点击li显示对应的图片
}
function liLick() {
    // ul.style.left = this.index * imgWidth;
    animate(ul, -this.index * imgWidth, 40);
    //3.3让选中项高亮显示
    for (i = 0; i < count; i++) {
        li = ol.children[i];
        li.className = '';
    }
    this.className = 'current';

    //4.点击序号li,重新记录全局的index
    index = this.index;
}
//4.点击arr可以左右切换
//4.1点击arr 高亮显示
var index = 0;  //默认是第一张的索引
right.onclick = function () {
    if (index === count) {
        // animate(ul,-index*imgWidth,50);
        index = 0;
        ul.style.left = -index * imgWidth + 'px';
        // ul.style.left = '0px';
    }
    index++;
    if (index < count) {
        // animate(ul, -index * imgWidth, 40);
        ol.children[index].click();
    } else {
        //4.4以动画的形式 将克隆的图片显示出来
        animate(ul, -index * imgWidth, 40);
        //4.2.2取消所有序号li的高亮显示
        for (i = 0; i < count; i++) {
            li = ol.children[i];
            li.className = '';
        }
        ol.children[0].className = 'current';
    }
}
//4.2上一张

left.onclick = function () {
    //判断 index是否是第一张 若是第一张 偷偷切换到克隆的第一张(真正的最后一张)
    if (index === 0) {
        index = 5;
        ul.style.left = -index * imgWidth + 'px';
    }
    index--;
    if (index >= 0) {
        ol.children[index].click();
    }
}
//4.3克隆第一张加到最后
var cloneLi = ul.children[0].cloneNode(true);
ul.appendChild(cloneLi);
//5.自动切换 无缝切换
var timeId = setInterval(function () {
    right.click();
}, intervalTime);

//tab切换
var adTab = document.getElementById('ad-tab');
var spansH = adTab.querySelectorAll('#ad-tab-hd span');
var i = 0; len = spansH.length;
for (; i < len; i++) {
    var spanHd = spansH[i];
    spanHd.setAttribute('index',i);
    spanHd.onmouseover = function () {
        for (i = 0; i < len; i++) {
            var spanHd = spansH[i];
            spanHd.className = '';
        }
        this.className = 'ad-current';
        //
        var index = parseInt(this.getAttribute('index'));
        var adDivs = document.querySelectorAll('#ad-tab-bd div');
        var divsLen = adDivs.length;
        for (i = 0; i < divsLen; i++) {
            var div = adDivs[i];
            div.className = '';
        }
        adDivs[index].className = 'ad-current';
    }
}

