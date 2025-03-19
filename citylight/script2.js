import * as THREE from "three";
import CameraControls from "camera-controls";
import cubePosition from "./cubesPosition";

CameraControls.install({ THREE: THREE });
//----------------------------------------------------------------- BASIC parameters
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

if (window.innerWidth > 800) {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;
  //renderer.toneMapping = THREE.ReinhardToneMapping;
  //console.log(window.innerWidth);
}
//---

let div1 = document.getElementsByClassName("div1")[0];

div1.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

var camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  1,
  500
);

camera.position.set(0, 2, 14);

var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();
let cameraControls;
let clock;

var createCarPos = true;
var uSpeed = 0.001;

//----------------------------------------------------------------- FOG background

var setcolor = 0xf02050;
//var setcolor = 0xF2F111;
//var setcolor = 0xFF6347;

scene.background = new THREE.Color(setcolor);
scene.fog = new THREE.Fog(setcolor, 10, 50);
//scene.fog = new THREE.FogExp2(setcolor, 0.05);
//----------------------------------------------------------------- RANDOM Function
function mathRandom(num = 8) {
  var numValue = -Math.random() * num + Math.random() * num;
  return numValue;
}
//----------------------------------------------------------------- CHANGE bluilding colors
function setTintColor() {
  var setColor = 0x000000;
  return setColor;
}

//----------------------------------------------------------------- CREATE City

function init() {
  clock = new THREE.Clock();
  cubePosition.forEach((element) => {
    let x = element[0];
    let z = element[1];
    let y = element[2];
    let c = element[3];
    var geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    var material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      //wireframe: false,
      //opacity: 0.9,
      //transparent: true,
      //roughness: 0.3,
      //metalness: 1,
      flatShading: false,
      //side: THREE.DoubleSide,
    });
    if (c != undefined) {
      material.setValues({ color: 0xffffff });
    }
    var wmaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      //shading: THREE.FlatShading,
    });

    var cube = new THREE.Mesh(geometry, material);
    var floor = new THREE.Mesh(geometry, material);
    var wfloor = new THREE.Mesh(geometry, wmaterial);

    cube.add(wfloor);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotationValue = 8 + Math.abs(mathRandom(8));

    floor.scale.y = 0.5; //+mathRandom(0.5);
    cube.scale.y = y;

    var cubeWidth = 0.9;
    cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
    //cube.position.y = cube.scale.y / 2;
    cube.position.x = x;
    cube.position.z = z;

    floor.position.set(
      cube.position.x,
      0 /*floor.scale.y / 2*/,
      cube.position.z
    );

    town.add(floor);
    town.add(cube);
  });
  //----------------------------------------------------------------- Particular

  var gmaterial = new THREE.MeshToonMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  });
  var gparticular = new THREE.CircleGeometry(0.01, 3);
  var aparticular = 5;

  for (var h = 1; h < 300; h++) {
    var particular = new THREE.Mesh(gparticular, gmaterial);
    particular.position.set(
      mathRandom(aparticular),
      mathRandom(aparticular),
      mathRandom(aparticular)
    );
    particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
    smoke.add(particular);
  }

  var pmaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    roughness: 10,
    metalness: 0.6,
    opacity: 0.9,
    transparent: true,
  });
  var pgeometry = new THREE.PlaneGeometry(60, 60);
  var pelement = new THREE.Mesh(pgeometry, pmaterial);
  pelement.rotation.x = (-90 * Math.PI) / 180;
  pelement.position.y = -0.001;
  pelement.receiveShadow = true;
  //pelement.material.emissive.setHex(0xFFFFFF + Math.random() * 100000);

  city.add(pelement);

  cameraControls = new CameraControls(camera, renderer.domElement);
  cameraControls.mouseButtons.right = CameraControls.ACTION.OFFSET;
  cameraControls.setBoundary(null);
}

//----------------------------------------------------------------- MOUSE function

//----------------------------------------------------------------- Lights
var ambientLight = new THREE.AmbientLight(0xffffff, 4);
var lightFront = new THREE.SpotLight(0xffffff, 20, 10);
var lightBack = new THREE.PointLight(0xffffff, 0.5);

var spotLightHelper = new THREE.SpotLightHelper(lightFront);
//scene.add( spotLightHelper );

lightFront.rotation.x = (45 * Math.PI) / 180;
lightFront.rotation.z = (-45 * Math.PI) / 180;
lightFront.position.set(5, 5, 5);
lightFront.castShadow = true;
lightFront.shadow.mapSize.width = 6000;
lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
lightFront.penumbra = 0.1;
lightBack.position.set(0, 6, 0);

smoke.position.y = 2;

scene.add(ambientLight);
city.add(lightFront);
scene.add(lightBack);
scene.add(city);
city.add(smoke);
city.add(town);

//----------------------------------------------------------------- GRID Helper
var gridHelper = new THREE.GridHelper(60, 120, 0xff0000, 0x000000);
city.add(gridHelper);

//----------------------------------------------------------------- CAR world
var generateCar = function () {};
//----------------------------------------------------------------- LINES world

var createCars = function (cScale = 2, cPos = 20, cColor = 0xffff00) {
  var cMat = new THREE.MeshToonMaterial({
    color: cColor,
    side: THREE.DoubleSide,
  });
  var cGeo = new THREE.BoxGeometry(1, cScale / 40, cScale / 40);
  var cElem = new THREE.Mesh(cGeo, cMat);
  var cAmp = 3;

  if (createCarPos) {
    createCarPos = false;
    cElem.position.x = -cPos;
    cElem.position.z = mathRandom(cAmp);

    TweenMax.to(cElem.position, 3, {
      x: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3),
    });
  } else {
    createCarPos = true;
    cElem.position.x = mathRandom(cAmp);
    cElem.position.z = -cPos;
    cElem.rotation.y = (90 * Math.PI) / 180;

    TweenMax.to(cElem.position, 5, {
      z: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3),
      ease: Power1.easeInOut,
    });
  }
  cElem.receiveShadow = true;
  cElem.castShadow = true;
  cElem.position.y = Math.abs(mathRandom(5));
  city.add(cElem);
};

var generateLines = function () {
  for (var i = 0; i < 60; i++) {
    createCars(0.1, 20);
  }
};

//----------------------------------------------------------------- CAMERA position

var cameraSet = function () {
  createCars(0.1, 20, 0xffffff);
  //TweenMax.to(camera.position, 1, {y:1+Math.random()*4, ease:Expo.easeInOut})
};

//----------------------------------------------------------------- ANIMATE

var animate = function () {
  var time = Date.now() * 0.00005;
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const updated = cameraControls.update(delta);

  smoke.rotation.y += 0.01;
  smoke.rotation.x += 0.01;

  camera.lookAt(city.position);
  renderer.render(scene, camera);
};

function moveTo(targetPosition, lookAtTarget) {
  cameraControls.reset(true);
  cameraControls.setLookAt(
    targetPosition.x,
    targetPosition.y,
    targetPosition.z,
    lookAtTarget.x,
    lookAtTarget.y,
    lookAtTarget.z,
    true // Smooth animation
  );
  animate();
}

//----------------------------------------------------------------- BUTTON functions

let contactMe = document.getElementsByClassName("contactme")[0];
contactMe.addEventListener("click", () => {
  const targetPosition = new THREE.Vector3(0, 10, 5);
  const lookAtTarget = new THREE.Vector3(5, 10, 5);
  moveTo(targetPosition, lookAtTarget);
});

let me = document.getElementsByClassName("me")[0];
me.addEventListener("click", () => {
  const targetPosition = new THREE.Vector3(0, 10, 30);
  const lookAtTarget = new THREE.Vector3(5, 10, 5);
  moveTo(targetPosition, lookAtTarget);
});

let experience = document.getElementsByClassName("experience")[0];
experience.addEventListener("click", () => {
  const targetPosition = new THREE.Vector3(20, 0, -5);
  const lookAtTarget = new THREE.Vector3(35, 5, -25);
  moveTo(targetPosition, lookAtTarget);
});

let graduation = document.getElementsByClassName("graduation")[0];
graduation.addEventListener("click", () => {
  const targetPosition = new THREE.Vector3(0, 0, 50);
  const lookAtTarget = new THREE.Vector3(15, 0, 35);
  moveTo(targetPosition, lookAtTarget);
});

let reset = document.getElementsByClassName("reset")[0];
reset.addEventListener("click", () => {
  cameraControls.reset(true);
  //cameraControls.setLookAt(0, 10, 30, 0, 0, 0, true);
  renderer.render(scene, camera);
});

//----------------------------------------------------------------- START functions
generateLines();
init();
animate();
