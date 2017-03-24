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

    // 添加星空背景
    // starsBackground();

    // 创建方向光和环境光
    // createDirectionalLight();
    // createAmbientLight();

    // 显示一个坐标轴，红色X，绿色Y，蓝色Z
    var axisHelper = new THREE.AxisHelper(1000);
    scene.add(axisHelper);

    bp = new WalkingMatch();
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
// var theta = 0;

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
    // bp.rotate(theta, theta * 2);
    // theta += 0.16;
}

function render() {
    "use strict";
    requestId = requestAnimationFrame(render);

    updateCamera();

    // 用于统计帧速率
    frameCount++;

    animate();

    renderer.render(scene, camera);
}

var NORMALIZATION_COEFFICIENT= 16;

bodyProportions = {
    head : {
        length: 180 / NORMALIZATION_COEFFICIENT,
        height: 300 / NORMALIZATION_COEFFICIENT,
        depth: 250 / NORMALIZATION_COEFFICIENT
    },
    belly : {
        length: 300 / NORMALIZATION_COEFFICIENT,
        height: 650 / NORMALIZATION_COEFFICIENT,
        depth: 300 / NORMALIZATION_COEFFICIENT
    },
    arm_central : {
        length: 115 / NORMALIZATION_COEFFICIENT,
        height: 390 / NORMALIZATION_COEFFICIENT,
        depth: 250 / NORMALIZATION_COEFFICIENT
    },
    arm_circular : {
        length: 115 / NORMALIZATION_COEFFICIENT,
        height: 460 / NORMALIZATION_COEFFICIENT,
        depth: 250 / NORMALIZATION_COEFFICIENT
    },
    leg_central : {
        length: 150 / NORMALIZATION_COEFFICIENT,
        height: 570 / NORMALIZATION_COEFFICIENT,
        depth: 200 / NORMALIZATION_COEFFICIENT
    },
    leg_circular : {
        length: 150 / NORMALIZATION_COEFFICIENT,
        height: 575 / NORMALIZATION_COEFFICIENT,
        depth: 200 / NORMALIZATION_COEFFICIENT
    }
};

bodyFixedPoint = {
    belly : new THREE.Vector3(0,0,0),
    head : new THREE.Vector3(0,(bodyProportions.head.height + bodyProportions.belly.height) / 2,0),
    left_arm : new THREE.Vector3(-(bodyProportions.arm_central.length + bodyProportions.belly.length) / 2,
        bodyProportions.belly.height / 2, 0),
    right_arm : new THREE.Vector3(+(bodyProportions.arm_central.length + bodyProportions.belly.length) / 2,
        bodyProportions.belly.height / 2, 0),
    left_leg : new THREE.Vector3(-bodyProportions.belly.length / 4, -bodyProportions.belly.height / 2, 0),
    right_leg : new THREE.Vector3(+bodyProportions.belly.length / 4, -bodyProportions.belly.height / 2, 0)
};


function BodyPart(central, circular) {
    this.centralPart = bodyProportions[central];
    this.centralPartName = central;
    this.centralPartMesh = null;
    this.circularPart = bodyProportions[circular];
    this.circularPartName = circular;
    this.circularPartMesh = null;
    this.group = new THREE.Group();
    this.position = new THREE.Vector3(0, 0, 0);
}

BodyPart.prototype = {
    constructor : BodyPart,
    initialize : function() {
        var pos = new THREE.Vector3();
        var mat = new THREE.Matrix4();
        this.group.matrixAutoUpdate = false;

        var geometry = new THREE.BoxGeometry( this.centralPart.length,
            this.centralPart.height, this.centralPart.depth );
        for ( i = 0; i < geometry.faces.length; i += 2 ) {
            var hex = getRandColor();
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );
        }
        var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } )
        var cube = new THREE.Mesh( geometry, material );
        cube.bodyPart = this.centralPartName;
        cube.matrixAutoUpdate = false;
        pos.y = -this.centralPart.height / 2;
        mat.setPosition(pos);
        cube.matrix.copy(mat);
        cube.keyPoint = new THREE.Vector3(0, -this.centralPart.height, 0);
        this.centralPartMesh = cube;
        this.group.add(cube);

        geometry = new THREE.BoxGeometry( this.circularPart.length,
            this.circularPart.height, this.circularPart.depth );
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
        pos.y = -this.circularPart.height/ 2
            - this.centralPart.height;
        mat.setPosition(pos);
        cube.matrix.copy(mat);
        cube.keyPoint = new THREE.Vector3(0, 0, 0);
        this.circularPartMesh = cube;
        this.group.add(cube);
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

        vec.y = -bodyProportions[this.circularPartName].height / 2;
        tranmat.setPosition(vec);
        curmat.makeRotationX(degrees2radians(-centralDegree));
        tranmat.premultiply(curmat);
        curmat.copy(zero);
        curmat.setPosition(this.centralPartMesh.keyPoint);
        tranmat.premultiply(curmat);
        this.circularPartMesh.matrix.copy(tranmat);

        tranmat.copy(zero);
        tranmat.makeRotationX(degrees2radians(-circularDegree));
        curmat.copy(zero);
        curmat.setPosition(this.position);
        tranmat.premultiply(curmat);
        this.group.matrix.copy(tranmat);
    }
};

function WalkingMatch() {
    this.leftArm = new BodyPart('arm_central', 'arm_circular');
    this.rightArm = new BodyPart('arm_central', 'arm_circular');
    this.leftLeg = new BodyPart('leg_central', 'leg_circular');
    this.rightLeg = new BodyPart('leg_central', 'leg_circular');
    this.bellyMesh = null;
    this.headMesh = null;
    this.group = new THREE.Group();
    this.position = new THREE.Vector3();
    this.fixedPoint = new THREE.Vector3(0, bodyProportions.belly.height / 2 + bodyProportions.leg_central.height +
        bodyProportions.leg_circular.height );
}

WalkingMatch.prototype = {
    constructor : WalkingMatch,
    initialize: function () {
        this.leftArm.initialize();
        this.rightArm.initialize();
        this.leftLeg.initialize();
        this.rightLeg.initialize();
        this.group.add(this.leftArm.group);
        this.group.add(this.rightArm.group);
        this.group.add(this.leftLeg.group);
        this.group.add(this.rightLeg.group);

        this.group.matrixAutoUpdate = false;

        var mat = new THREE.Matrix4();
        this.group.matrixAutoUpdate = false;
        this.leftArm.position = bodyFixedPoint.left_arm;
        this.leftArm.rotate(0, 0);
        this.rightArm.position = bodyFixedPoint.right_arm;
        this.rightArm.rotate(0, 0);
        this.leftLeg.position = bodyFixedPoint.left_leg;
        this.leftLeg.rotate(0, 0);
        this.rightLeg.position = bodyFixedPoint.right_leg;
        this.rightLeg.rotate(0, 0);

        // Create the belly and the head
        var belly = bodyProportions.belly;
        var geometry = new THREE.BoxGeometry( belly.length, belly.height, belly.depth );
        for ( i = 0; i < geometry.faces.length; i += 2 ) {
            var hex = getRandColor();
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );
        }
        var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
        var cube = new THREE.Mesh( geometry, material );
        cube.bodyPart = 'belly';
        cube.matrixAutoUpdate = false;
        mat.setPosition(bodyFixedPoint.belly);
        cube.matrix.copy(mat);
        cube.keyPoint = new THREE.Vector3(0, 0, 0);
        this.bellyMesh = cube;
        this.group.add(cube);

        var head = bodyProportions.head;
        geometry = new THREE.BoxGeometry( head.length, head.height, head.depth );
        for ( i = 0; i < geometry.faces.length; i += 2 ) {
            var hex = getRandColor();
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );
        }
        material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
        cube = new THREE.Mesh( geometry, material );
        cube.bodyPart = 'head';
        cube.matrixAutoUpdate = false;
        mat.setPosition(bodyFixedPoint.head);
        cube.matrix.copy(mat);
        cube.keyPoint = new THREE.Vector3(0, 0, 0);
        this.headMesh = cube;
        this.group.add(cube);

        scene.add(this.group);
        this.rotate(0);
    },
    rotate : function (degree) {
        var tranmat = new THREE.Matrix4();
        var curmat = new THREE.Matrix4();

        curmat.setPosition(this.fixedPoint);
        tranmat.premultiply(curmat);
        this.group.matrix.copy(tranmat);
    }
};

