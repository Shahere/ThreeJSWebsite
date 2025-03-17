import * as THREE from "three";

export default class Cube {
  constructor(x, y, z) {
    this.right = 0;
    this.left = 1;
    this.top = 2;
    this.bottom = 3;
    this.front = 4;
    this.back = 5;

    this.materials = [
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Right face
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Left face
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Top face
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Bottom face
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Front face
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Back face
    ];

    this.geometry = new THREE.BoxGeometry(10, 10, 10);
    this.mesh = new THREE.Mesh(this.geometry, this.materials);

    this.mesh.position.set(x, y, z);
  }

  createTexture(texts, size) {
    let nbText = texts.length;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 256;
    let distance = canvas.width / (nbText + 1);
    console.log(nbText);

    context.fillStyle = "#ffffff"; //BG color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000"; //TEXT color
    context.font = size + " Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (let i = 0; i < nbText; i++) {
      const text = texts[i];
      console.log(distance * (i + 1));
      context.fillText(text, canvas.width / 2, distance * (i + 1));
    }
    const texture = new THREE.CanvasTexture(canvas);

    return texture;
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }
}
