/**
 * Created by 40637 on 2017/3/21.
 */

// 调试输出中最多显示记录的条数
var DEBUG_TEXT_MAX_NUMBER = 14;

// 是否开启调试模式，true开启，false关闭
// var DEBUG_ON_OFF = true;
var DEBUG_ON_OFF = false;

// 更规范的方式，定义全局变量，然后通过全局变量访问其他库中定义的函数和变量
var THREE = window.THREE;
var dat = window.dat;

// 用于调试输出，控制div标签的id="debug_text"
var debug_text_number = 0;
var debug_text_content = [];

// 参数text是调试输出的文本，在控制台日志和屏幕右下角的调试输出中会输出相同的内容
// printTrace指定是否打印调用栈
// stopRunning指定是否在打印输出结束之后终止函数的运行（抛出异常）
function errout(text, printTrace, stopRunning) {
    "use strict";
    if (!DEBUG_ON_OFF) {
        return;
    }
    window.console.log(text);
    debug_text_number++;
    // 数组方法push()和shift()分别是队列的enqueue()与dequeue()方法
    debug_text_content.push(text);
    if (debug_text_number > DEBUG_TEXT_MAX_NUMBER) {
        debug_text_content.shift();
    }
    var debug_text = document.getElementById('debug_text');
    debug_text.height = canvHeight;
    // join也是一种数组方法，用于合成为一个字符串，并插入指定的分隔符
    debug_text.innerHTML = debug_text_content.join('<br/>');
    // 打印调用栈
    if (printTrace === true) {
        try {
            if (stopRunning === true) {
                throw new Error();
            } else {
                throw new Error('一般错误：' + text);
            }
        }
        catch (e) {
            if (stopRunning === true) {
                throw new Error('严重错误：' + text + '\n' + e.stack);
            } else {
                window.console.error(e.stack);
            }
        }
    }
}

// 弧度转角度
function radians2degrees(radians) {
    "use strict";
    return (radians / Math.PI * 180);
}
// 角度转弧度
function degrees2radians(degrees) {
    "use strict";
    return (degrees / 180 * Math.PI);
}
// 一角度对应的弧度
var ONE_DEGREE_IN_RADIANS = degrees2radians(1);

// 画布的宽和高，涉及到绘制区域的大小，统一使用这两个变量。
// 这两个变量在文档加载，窗口大小改变，显示左侧面板等改变画布大小的区域等情况下，都会更新。
var canvHeight;
var canvWidth;

// getRandColor() 从给定列表中随机选取一种颜色
var colors = [
    0xFF62B0,
    0x9A03FE,
    0x62D0FF,
    0x48FB0D,
    0xDFA800,
    0xC27E3A,
    0x990099,
    0x9669FE,
    0x23819C,
    0x01F33E,
    0xB6BA18,
    0xFF800D,
    0xB96F6F,
    0x4A9586
];
function getRandColor() {
    "use strict";
    return colors[Math.floor(Math.random() * colors.length)];
}

// 显示帧速率
var lastFrameCount = 0;
var frameCount = 0;
function FPS() {
    "use strict";
    if (!DEBUG_ON_OFF) {
        return;
    }
    errout(Date.now() + ": " + (frameCount - lastFrameCount) + 'FPS');
    lastFrameCount = frameCount;
    window.setTimeout(FPS, 1000);
}
