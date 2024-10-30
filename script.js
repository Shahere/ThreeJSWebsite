import * as THREE from "three"
import CameraControls from "camera-controls";
CameraControls.install( { THREE: THREE } );
var camera, scene, renderer, geometry, material, mesh, clock, cameraControls, light;
document.addEventListener('wheel', (e) => {
    move(e)
})

let div1 = document.getElementsByClassName('div1')[0]
let div2 = document.getElementsByClassName('div2')[0]

function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
    light = new THREE.AmbientLight( 0x404040 ); 
    camera.position.z = 30;
    scene.add(camera);
    scene.add(light)

    var grid = new THREE.GridHelper(100, 10);
    grid.position.y = -5
    createCubeWithText(5, 5, 0, "Bonjour !")
    createCube(5, 5, 10)
    createCube(15, 35, 0)
    scene.add(grid);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    div1.appendChild(renderer.domElement);
    cameraControls = new CameraControls( camera, renderer.domElement );
    cameraControls.mouseButtons.right = CameraControls.ACTION.OFFSET;

}

function animate() {
    
    requestAnimationFrame(animate);
    render();

}

function render() {
    const delta = clock.getDelta();
	const updated = cameraControls.update( delta );
    updated && renderer.render(scene, camera);
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
    material = new THREE.MeshLambertMaterial()

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z)

    scene.add(mesh)
}

function createCubeWithText(x, z, y, text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;
    
    context.fillStyle = '#ffffff'; 
    context.fillRect(0, 0, canvas.width, canvas.height); 
    context.fillStyle = '#000000';
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


init();
animate();
render()