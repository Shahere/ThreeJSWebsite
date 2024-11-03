import * as THREE from "three"
import CameraControls from "camera-controls";
import CubeContact from "./cubes/contactme";
import CubeExp from "./cubes/CubeExp";
import CubeExp2 from "./cubes/CubeExp2";

CameraControls.install({ THREE: THREE });
var camera, scene, renderer, geometry, material, mesh, clock, cameraControls, light;

let firstRender = true;

let div1 = document.getElementsByClassName('div1')[0]
let contactMe = document.getElementsByClassName('contactme')[0]
contactMe.addEventListener('click', () => {
    const targetPosition = new THREE.Vector3(-35, 0, -45);
    const lookAtTarget = new THREE.Vector3(-35, 0, -25);
    moveTo(targetPosition, lookAtTarget)
});

let me = document.getElementsByClassName('me')[0]
me.addEventListener('click', () => {
    const targetPosition = new THREE.Vector3(0, 0, 30);
    const lookAtTarget = new THREE.Vector3(5, 5, 5);
    moveTo(targetPosition, lookAtTarget)
});

let experience = document.getElementsByClassName('experience')[0]
experience.addEventListener('click', () => {
    const targetPosition = new THREE.Vector3(20, 0, -5);
    const lookAtTarget = new THREE.Vector3(35, 5, -25);
    moveTo(targetPosition, lookAtTarget)
});

let graduation = document.getElementsByClassName('graduation')[0]
graduation.addEventListener('click', () => {
    const targetPosition = new THREE.Vector3(0, 0, 50);
    const lookAtTarget = new THREE.Vector3(15, 0, 35);
    moveTo(targetPosition, lookAtTarget)
});

function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
    light = new THREE.AmbientLight(0xffffff);
    scene.add(camera);
    scene.add(light)

    var grid = new THREE.GridHelper(100, 10);
    grid.position.y = -5
    scene.add(grid);
    createCubeWithText(5, 0, 5, "Bonjour !")
    createCube(5, 10, 5)

    createCubeWithText(15, 0, 35, "Graduation")

    let cubeContact = new CubeContact(-35, 0, -25)
    cubeContact.addToScene(scene)

    let cubeExp1 = new CubeExp(35, 0, -25)
    let cubeExp2 = new CubeExp2(35, 10, -25)
    cubeExp1.addToScene(scene)
    cubeExp2.addToScene(scene)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    div1.appendChild(renderer.domElement);
    cameraControls = new CameraControls(camera, renderer.domElement);
    cameraControls.mouseButtons.right = CameraControls.ACTION.OFFSET;
    cameraControls.setBoundary(null);
    const targetPosition = new THREE.Vector3(0, 0, 30);
    const lookAtTarget = new THREE.Vector3(5, 5, 5);
    moveTo(targetPosition, lookAtTarget)
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


function createCube(x, y, z) {
    geometry = new THREE.BoxGeometry(10, 10, 10);
    material = new THREE.MeshLambertMaterial()

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z)

    scene.add(mesh)
}

function createCubeWithText(x, y, z, text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;

    context.fillStyle = '#ffffff'; //BG color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#000000'; //TEXT color
    context.font = '40px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2); // Draw text in the center

    const texture = new THREE.CanvasTexture(canvas);

    const materials = [
        new THREE.MeshLambertMaterial({ color: 0xffffff }), // Right face
        new THREE.MeshLambertMaterial({ color: 0xffffff }), // Left face
        new THREE.MeshLambertMaterial({ color: 0xffffff }), // Top face
        new THREE.MeshLambertMaterial({ color: 0xffffff }), // Bottom face
        new THREE.MeshLambertMaterial({ map: texture }),    // Front face (with text)
        new THREE.MeshLambertMaterial({ color: 0xffffff })  // Back face
    ];

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const mesh = new THREE.Mesh(geometry, materials);

    mesh.position.set(x, y, z);
    scene.add(mesh);
}

function moveTo(targetPosition, lookAtTarget) {
    cameraControls.reset(true)
    cameraControls.setLookAt(
        targetPosition.x, targetPosition.y, targetPosition.z,
        lookAtTarget.x, lookAtTarget.y, lookAtTarget.z,
        true // Smooth animation
    );
    animate();
}


init();
animate();
render()