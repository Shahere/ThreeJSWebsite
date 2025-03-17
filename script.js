import * as THREE from "three";
import CameraControls from "camera-controls";
import CubeContact from "./cubes/contactme";
import CubeExp from "./cubes/CubeExp";
import CubeExp2 from "./cubes/CubeExp2";
import CubeHello from "./cubes/CubeHello";
import CubeGraduation from "./cubes/CubeGraduation";
import Cube from "./cubes/Cube";

CameraControls.install({ THREE: THREE });
var camera,
  scene,
  renderer,
  geometry,
  material,
  mesh,
  clock,
  cameraControls,
  light;
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
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight
  );
  light = new THREE.AmbientLight(0xffffff);
  scene.add(camera);
  scene.add(light);

  // --------------------------------------- FOG ---------------------------------------
  var setcolor = 0x000000;

  scene.background = new THREE.Color(setcolor);
  scene.fog = new THREE.Fog(setcolor, 0, 150);
  // --------------------------------------- FOG ---------------------------------------

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

  renderer = new THREE.WebGLRenderer();
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

init();
animate();
render();
