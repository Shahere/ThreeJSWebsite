import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var camera, scene, renderer, geometry, material, mesh, controls;
document.addEventListener('wheel', (e) => {
    move(e)
})


init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);

    var mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial());
    scene.add(mesh);
    scene.add(camera);

    camera.position.z = 30;

    var grid = new THREE.GridHelper(100, 10);
    grid.position.y = -5
    createCube(5, 5, 0)
    createCube(5, 5, 10)
    createCube(15, 35, 0)
    scene.add(grid);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    render()
}

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

    renderer.render(scene, camera);
}

function move(e) {
    if (e.deltaY < 0) {
        camera.position.z++
    } else {
        camera.position.z--
    }
}

function createCube(x, z, y) {
    geometry = new THREE.BoxGeometry(10, 10, 10);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z)

    scene.add(mesh)
}

