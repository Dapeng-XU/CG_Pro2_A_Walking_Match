/**
 * Created by 40637 on 2017/3/22.
 */

// 每次窗口的大小发生改变时，也改变画布的大小
window.onresize = canvasResize;

document.body.onload = function () {
    "use strict";
    redraw();
}

// 避免多个requestAnimationFrame()循环同时绘制图像。
/* 对整个场景进行重绘（重新建立一个绘制，scene也重新创建）时，如果不停止已有的动画循环，即不使用下面这段代码，会造成帧速率升高
 * 的问题。这是由JavaScript的内部机制决定的。
 */
var requestId;
function stop() {
    "use strict";
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}

// 初始化的图形绘制
var scene = new THREE.Scene();
var camera, renderer, raycaster;
var canv = document.getElementById('canvas');
// 默认背景色
var DEFAULT_BACKGROUND_COLOR = 0x000000;
function initGraphics() {
    "use strict";
    var i;

    // Three.js的三要素：场景、相机、渲染器。
    // 相机的初始化代码提到后面了
    // 初始化渲染器为使用WebGL的绑定到ID为“canvas”的元素，参数使用JSON表示。
    renderer = new THREE.WebGLRenderer({
        canvas: canv
    });

    // 重设渲染器的大小为窗口大小；否则，默认的渲染大小很小，在屏幕上显示出大的块状。
    // setSize()同时会改变画布大小
    renderer.setSize(canvWidth, canvHeight);
    // 设置画布默认的背景色
    renderer.setClearColor(DEFAULT_BACKGROUND_COLOR);
    if (window.devidevicePixelRatio) {
        renderer.setPixelRatio(window.devicePixelRatio);
    }
    renderer.sortObjects = false;

    // 此处，交换顶点次序能够得到相同的结果
    // var vertexList = [[-7, -7], [-5, 20], [16, 16], [19, 1]];
    // var vertexList = [[-8, -8], [-8, 8], [8, 8], [8, -8]];
    // var vertexList = [[-20, -20], [30, -30], [40, 30], [50, 20], [-20, 40]];
    // loadFloorAndCeiling([0, 0], vertexList, {floorFill: 'images/materials/white.jpg'});
    // loadFloorAndCeiling([0, 0], vertexList);

    // var vertexListLength = vertexList.length;
    // for (i = 0; i < vertexListLength - 1; i++) {
    //     drawSingleWall(vertexList[i], vertexList[i + 1]);
    // }
    // drawSingleWall(vertexList[vertexListLength - 1], vertexList[0]);

    // 绘制很大的天花板和地板
    // loadFloorAndCeiling([0, 0], FLOOR_VERTICES, {floorFill: 'images/materials/gray50.jpg'});

    // var floor_for_basic_shape;
    // // 从已添加的对象中寻找地板元素，以便于移动用于调试的基本图形
    // for (i = 0; i < scene.children.length; i++) {
    //     if (scene.children[i].typename === 'floor') {
    //         floor_for_basic_shape = scene.children[i];
    //         break;
    //     }
    // }
    // if (!floor_for_basic_shape) {
    //     errout('error', true);
    // }

    // 加载户型数据，并进行解析和绘制
    // loadApartment();

    // 添加星空背景
    // starsBackground();

    // 创建方向光和环境光
    // createDirectionalLight();
    // createAmbientLight();

    // 显示一个坐标轴，红色X，绿色Y，蓝色Z
    var axisHelper = new THREE.AxisHelper(1000);
    scene.add(axisHelper);

    // 显示网格
    // var gridHelper = new THREE.GridHelper(10, 20);
    // var gridHelper2 = new THREE.GridHelper(10, 20);
    // gridHelper2.position.y = room.height;
    // scene.add(gridHelper);
    // scene.add(gridHelper2);
    // var gridHelper3 = new THREE.GridHelper(10, 20);
    // gridHelper3.rotateX(Math.PI / 2);
    // gridHelper3.position.z = 8;
    // scene.add(gridHelper3);
    // var gridHelper4 = new THREE.GridHelper(10, 20);
    // gridHelper4.rotateX(Math.PI / 2);
    // gridHelper4.position.z = -8;
    // scene.add(gridHelper4);
    // var gridHelper5 = new THREE.GridHelper(10, 20);
    // gridHelper5.rotateZ(Math.PI / 2);
    // gridHelper5.position.x = 8;
    // scene.add(gridHelper5);
    // var gridHelper6 = new THREE.GridHelper(10, 20);
    // gridHelper6.rotateZ(Math.PI / 2);
    // gridHelper6.position.x = -8;
    // scene.add(gridHelper6);

    // 射线，用于拾取(pick)对象
    raycaster = new THREE.Raycaster();

    render();
}

function render() {
    "use strict";
    requestId = requestAnimationFrame(render);

    // 播放动画的代码应该放在下面的if语句块中，便于统一控制是否播放动画
    // if (playAnimation) {
    // }

    // updateCamera();

    // 用于统计帧速率
    frameCount++;

    renderer.render(scene, camera);
}
