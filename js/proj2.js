/**
 * Created by 40637 on 2017/3/22.
 */

// 每次窗口的大小发生改变时，也改变画布的大小
window.onresize = canvasResize;

document.body.onload = function () {
    "use strict";
    redraw();
}

var cube;
var ball;
var bp;

// 初始化的图形绘制
var scene = new THREE.Scene();
var camera, renderer, raycaster;
var light = new THREE.Group();
scene.add(light);
var canv = document.getElementById('canvas');
// 默认背景色
var DEFAULT_BACKGROUND_COLOR = 0xDDDDDD;
function initGraphics() {
    "use strict";
    var i, j;

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

    // 显示几何对象
    // var geo_box_0 = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
    // var mat_box_0 = new THREE.MeshBasicMaterial({
    //     color: 0x222222,
    //     lights: false
    // });
    // var cube = new THREE.Mesh(geo_box_0, mat_box_0);
    // // cube.position = new THREE.Vector3(0, 0, 0);
    // scene.add(cube);
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    // var geometry, material;
    // for (j = 0; j < 30; j++)
    // {
    //     if (j >= 13 && j <= 18) {
    //         continue;
    //     }
    //     geometry = new THREE.BoxGeometry( 5, 5, 5 );
    //     for ( i = 0; i < geometry.faces.length; i += 2 ) {
    //         var hex = Math.random() * 0xffffff;
    //         geometry.faces[ i ].color.setHex( hex );
    //         geometry.faces[ i + 1 ].color.setHex( hex );
    //     }
    //     material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
    //     cube = new THREE.Mesh( geometry, material );
    //     cube.position.x = 0;
    //     cube.position.y = 0;
    //     cube.position.z = j * 5 - 75;
    //     scene.add( cube );
    // }
    //
    // {
    //     geometry = new THREE.SphereGeometry( 4, 8, 8 );
    //     for ( i = 0; i < geometry.faces.length; i += 3) {
    //         var hex = getRandColor();
    //         geometry.faces[i].color.setHex( hex );
    //         if (geometry.faces[i+1] !== undefined) {
    //             geometry.faces[i+1].color.setHex( hex );
    //         }
    //         if (geometry.faces[i+2] !== undefined) {
    //             geometry.faces[i+2].color.setHex( hex );
    //         }
    //     }
    //     material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5} );
    //     ball = new THREE.Mesh( geometry, material );
    //     scene.add(ball);
    // }

    bp = new BodyPart('arm_central', 'arm_circular');
    bp.initialize();

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
    // raycaster = new THREE.Raycaster();

    // var normalized_coeff = 16;
    //
    //
    // var g = new THREE.Group();
    // {
    //     var pos = new THREE.Vector3();
    //     var mat = new THREE.Matrix4();
    //     var centralPart = bodyProportions.arm_central;
    //     var circularPart = bodyProportions.arm_circular;
    //
    //     geometry = new THREE.BoxGeometry( centralPart.length, centralPart.height, centralPart.depth );
    //     for ( i = 0; i < geometry.faces.length; i += 2 ) {
    //         var hex = getRandColor();
    //         geometry.faces[ i ].color.setHex( hex );
    //         geometry.faces[ i + 1 ].color.setHex( hex );
    //     }
    //     material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
    //     cube = new THREE.Mesh( geometry, material );
    //     cube.bodyPart = "central";
    //     pos = new THREE.Vector3(0, -centralPart.height / 2, 0);
    //     mat.setPosition(pos);
    //     cube.matrixAutoUpdate = false;
    //     cube.matrix.copy(mat);
    //     cube.keyPoint = new THREE.Vector3(0, -centralPart.height, 0);
    //     g.add(cube);
    //
    //     geometry = new THREE.BoxGeometry( circularPart.length, circularPart.height, circularPart.depth );
    //     for ( i = 0; i < geometry.faces.length; i += 2 ) {
    //         var hex = getRandColor();
    //         geometry.faces[ i ].color.setHex( hex );
    //         geometry.faces[ i + 1 ].color.setHex( hex );
    //     }
    //     material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
    //     cube = new THREE.Mesh( geometry, material );
    //     cube.bodyPart = "circular";
    //     pos = new THREE.Vector3(0, -centralPart.height - circularPart / 2, 0);
    //     mat.setPosition(pos);
    //     cube.matrixAutoUpdate = false;
    //     cube.matrix.copy(mat);
    //     cube.keyPoint = null;
    //     g.add(cube);
    // }
    //
    // scene.add(g);



    updateLight();
    launchDefaultCamera();
    // FPS();

    render();
}

function updateLight() {
    light.add(new THREE.AmbientLight(0x888888, 0.5));
}

function launchDefaultCamera() {
    camera = new THREE.PerspectiveCamera(40, canvWidth / canvHeight, 0.1, 10000);
    // cPosition = new THREE.Vector3(10,10,10);
    lPosition = new THREE.Vector3(0,0,0);
    var one = 300;
    camera.position.x = one;
    camera.position.y = one;
    camera.position.z = one;
    camera.lookAt(lPosition);
    // scene.add(camera);
    camera.updateMatrixWorld();
}

function updateCamera() {
    lPosition = new THREE.Vector3(0,0,0);
    camera.lookAt(lPosition);
    camera.updateMatrixWorld();
}

cameraEllipseAnimate = {
    theta : 0.0,
    xa : 5,
    zb : 20,
    yc : 10,
    x : function () {
        return this.xa * Math.cos(this.theta);
    },
    y : function () {
        return (this.theta >= 0) ? (-this.yc*2/Math.PI*(this.theta - Math.PI/2)) :
            (this.yc*2/Math.PI*(this.theta + Math.PI / 2));
        // return 0;
    },
    z : function () {
        return this.zb * Math.sin(this.theta);
    },
    increase : function () {
        this.theta += ONE_DEGREE_IN_RADIANS;
        while (this.theta > Math.PI) {
            this.theta -= 2 * Math.PI;
        }
    }
};

// var period0 = 0;

var theta = 0;

function animate() {
    // cube.position.x = Date.now() * 3 / 100 % 300 - 150;
    // ellipse
    // camera.position.x = cameraEllipseAnimate.x();
    // camera.position.y = cameraEllipseAnimate.y();
    // camera.position.z = cameraEllipseAnimate.z();
    cameraEllipseAnimate.increase();
    // ball.position.x = cameraEllipseAnimate.x();
    // ball.position.y = cameraEllipseAnimate.y();
    // ball.position.z = cameraEllipseAnimate.z();
    // period0++;
    // if (period0 % 10 === 0) {
    //     errout("x = " + ball.position.x + ", y = " + ball.position.y + ", z = " + ball.position.z);
    // }
    bp.rotate(theta, theta * 2);
    theta += 0.16;
}



function render() {
    "use strict";
    requestId = requestAnimationFrame(render);

    // 播放动画的代码应该放在下面的if语句块中，便于统一控制是否播放动画
    // if (playAnimation) {
    // }

    updateCamera();

    // 用于统计帧速率
    frameCount++;

    animate();

    renderer.render(scene, camera);

}

bodyProportions = {
    head : {
        length: 180,
        height: 300,
        depth: 250
    },
    belly : {
        length: 300,
        height: 650,
        depth: 300
    },
    arm_central : {
        length: 115,
        height: 390,
        depth: 250
    },
    arm_circular : {
        length: 115,
        height: 460,
        depth: 250
    },
    leg_central : {
        length: 150,
        height: 570,
        depth: 200
    },
    leg_circular : {
        length: 150,
        height: 575,
        depth: 200
    }
};

bodyKeyPoint = {
    belly : {
        x : 0,
        y : 0,
        z : 0
    },
    head : {
        x : 0,
        y : (bodyProportions.head.height + bodyProportions.belly.height) / 2,
        z : 0
    },
    arm_central : {
        x : 0,
        y : 0,
        z : 0
    },
    arm_circular : {
        x : 0,
        y : 0,
        z : 0
    },
    leg_central : {
        x : 0,
        y : 0,
        z : 0
    },
    leg_circular : {
        x : 0,
        y : 0,
        z : 0
    }
};

var NORMALIZATION_COEFFICIENT= 16;

function BodyPart(central, circular) {
    this.centralPart = bodyProportions[central];
    this.centralPartName = central;
    this.centralPartMesh = null;
    this.circularPart = bodyProportions[circular];
    this.circularPartName = circular;
    this.circularPartMesh = null;
    this.group = new THREE.Group();
}

BodyPart.prototype = {
    constructor : BodyPart,
    initialize : function() {
        var pos = new THREE.Vector3();
        var mat = new THREE.Matrix4();
        this.group.matrixAutoUpdate = false;

        var geometry = new THREE.BoxGeometry( this.centralPart.length / NORMALIZATION_COEFFICIENT,
            this.centralPart.height / NORMALIZATION_COEFFICIENT, this.centralPart.depth / NORMALIZATION_COEFFICIENT );
        for ( i = 0; i < geometry.faces.length; i += 2 ) {
            var hex = getRandColor();
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );
        }
        var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } )
        var cube = new THREE.Mesh( geometry, material );
        cube.bodyPart = this.centralPartName;
        cube.matrixAutoUpdate = false;
        pos.y = -this.centralPart.height / NORMALIZATION_COEFFICIENT / 2;
        mat.setPosition(pos);
        cube.matrix.copy(mat);
        cube.keyPoint = new THREE.Vector3(0, -this.centralPart.height / NORMALIZATION_COEFFICIENT);
        this.centralPartMesh = cube;
        this.group.add(cube);

        geometry = new THREE.BoxGeometry( this.circularPart.length / NORMALIZATION_COEFFICIENT,
            this.circularPart.height / NORMALIZATION_COEFFICIENT, this.circularPart.depth / NORMALIZATION_COEFFICIENT );
        for ( i = 0; i < geometry.faces.length; i += 2 ) {
            var hex = getRandColor();
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );
        }
        cube = new THREE.Mesh( geometry, material );
        cube.bodyPart = this.circularPartName;
        cube.matrixAutoUpdate = false;
        pos.x = 0;
        pos.z = 0;
        pos.y = -this.circularPart.height / NORMALIZATION_COEFFICIENT/ 2
            - this.centralPart.height / NORMALIZATION_COEFFICIENT;
        mat.setPosition(pos);
        cube.matrix.copy(mat);
        cube.keyPoint = new THREE.Vector3(0, 0, 0);
        this.circularPartMesh = cube;
        this.group.add(cube);

        scene.add(this.group);
    },
    rotate : function(centralDegree, circularDegree) {
        if (circularDegree < 0) {
            circularDegree = 0;
        }

        var tranmat = new THREE.Matrix4();
        var curmat = new THREE.Matrix4();
        var zero = new THREE.Matrix4();
        var original = new THREE.Vector3(0, 0, 0);
        var vec = new THREE.Vector3();

        vec.y = -bodyProportions[this.circularPartName].height / NORMALIZATION_COEFFICIENT / 2;
        tranmat.setPosition(vec);
        curmat.makeRotationX(degrees2radians(-centralDegree));
        tranmat.premultiply(curmat);
        curmat.copy(zero);
        curmat.setPosition(this.centralPartMesh.keyPoint);
        tranmat.premultiply(curmat);
        this.circularPartMesh.matrix.copy(tranmat);

        tranmat = new THREE.Matrix4();
        tranmat.makeRotationX(degrees2radians(-circularDegree));
        this.group.matrix.copy(tranmat);
    }
};

// function WalkingMatch() {
//     this.leftArm = new BodyPart();
//     this.group = new THREE.Group();
// }
//
// WalkingMatch.prototype = {
//
// };

