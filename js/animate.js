//封装 按钮事件处理函数中的代码(让一个元素,从左往右,或者从右往左缓慢移动)
/*
 * 作用: 让一个元素,从左往右,或者从右往左缓慢移动
 * element: 要求传入一个元素  元素
 * target : 元素移动的目标位置  数字
 * step: 步进(每次元素移动的距离)
 * callback : 回调函数  到达目标位置之后,会被调用
 * */

function animate(element, target, step, callback) {
    //    清除定时器
    if (element.timeid) {
        clearInterval(element.timeid);
    }
    //    1. 设置定时器
    element.timeid = setInterval(function () {
        //        2. 获取元素的当前位置
        var current = element.offsetLeft;
        //        3. 根据当前位置加上/减去我们的步进
        //         如果当前位置大于目标位置,就是减去步进.否则就是加上步进
        if (current > target) {
            //            证明是从右往左,应该减去step
            var pos = current - step;
        } else {
            // 证明是从左往右,应该加上step
            var pos = current + step;
        }

        //          4. 给element赋值新的位置
        element.style.left = pos + 'px';

        //          5. 判断是否到达目标位置,如果到达目标位置就停下来
        //          5.1 如何判断已经到达目标位置
        //              如果 当前位置(赋值之后的位置 pos)- 目标位置 的差值绝对值,小于步进,证明马上要到目标位置了
        if (Math.abs(pos - target) <= step) {
            //证明马上就要到达目标位置了
            //              5.2  清除定时器,直接把目标位置给元素
            clearInterval(element.timeid);
            element.style.left = target + 'px';
            //判断用户有没有传第四个参数,如果传了就调用,如果没传就不调用
            //        如果传入了函数,callback转换成布尔就是true,如果什么都没传,callback转换成布尔,就是false
            if (callback) {
                callback();
            }
        }

    }, 15);
}