import * as THREE from "three";
import CameraControls from "camera-controls";
import CubeContact from "./cubes/contactme";
import CubeExp from "./cubes/CubeExp";
import CubeExp2 from "./cubes/CubeExp2";
import CubeHello from "./cubes/CubeHello";
import CubeGraduation from "./cubes/CubeGraduation";
import Cube from "./cubes/Cube";

var setcolor = 0xf02050;

function mathRandom(num = 8) {
  var numValue = -Math.random() * num + Math.random() * num;
  return numValue;
}

let scene = new THREE.Scene();
let city = new THREE.Object3D();
let smoke = new THREE.Object3D();
let town = new THREE.Object3D();

scene.background = new THREE.Color(setcolor);
scene.fog = new THREE.Fog(setcolor, 10, 16);

CameraControls.install({ THREE: THREE });
let camera, renderer, clock, cameraControls, light;
let firstRender = true;

let div1 = document.getElementsByClassName("div1")[0];
let contactMe = document.getElementsByClassName("contactme")[0];
contactMe.addEventListener("click", () => {
  const targetPosition = new THREE.Vector3(-35, 0, -45);
  const lookAtTarget = new THREE.Vector3(-35, 0, -25);
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

function init() {
  clock = new THREE.Clock();
  setLights();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight
  );
  scene.add(camera);

  // --------------------------------------- FOG ---------------------------------------
  var setcolor = 0xf02050;

  scene.background = new THREE.Color(setcolor);
  scene.fog = new THREE.Fog(setcolor, 0, 150);
  // --------------------------------------- FOG ---------------------------------------

  // ------------------------------------ SOME FEATURES ----------------------------------
  var grid = new THREE.GridHelper(1000, 100);
  scene.add(grid);
  grid.position.set(0, -5, 0);

  let cubeHello = new CubeHello(5, 0, 5);
  cubeHello.addToScene(scene);

  let randomCube1 = new Cube(5, 10, 5);
  randomCube1.addToScene(scene);

  let graduationCube = new CubeGraduation(15, 0, 35);
  graduationCube.addToScene(scene);

  let cubeContact = new CubeContact(-35, 0, -25);
  cubeContact.addToScene(scene);

  let cubeExp1 = new CubeExp(35, 0, -25);
  let cubeExp2 = new CubeExp2(35, 10, -25);
  cubeExp1.addToScene(scene);
  cubeExp2.addToScene(scene);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  div1.appendChild(renderer.domElement);
  cameraControls = new CameraControls(camera, renderer.domElement);
  cameraControls.mouseButtons.right = CameraControls.ACTION.OFFSET;
  cameraControls.setBoundary(null);
  const targetPosition = new THREE.Vector3(0, 0, 30);
  const lookAtTarget = new THREE.Vector3(5, 5, 5);
  moveTo(targetPosition, lookAtTarget);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const delta = clock.getDelta();
  const updated = cameraControls.update(delta);

  if (firstRender || updated) {
    renderer.render(scene, camera);
    firstRender = false;
  }
}

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

function setLights() {
  //3 points lights
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

  scene.add(ambientLight);
  scene.add(lightFront);
  scene.add(lightBack);
}

init();
animate();
render();
