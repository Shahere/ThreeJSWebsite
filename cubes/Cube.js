import * as THREE from "three";

export default class Cube {
  constructor(x, y, z) {
    this.right = 0;
    this.left = 1;
    this.top = 2;
    this.bottom = 3;
    this.front = 4;
    this.back = 5;

    var material = new THREE.MeshStandardMaterial({
      color: this.setTintColor(),
      wireframe: false,
      //opacity:0.9,
      //transparent: true,
      //roughness: 0.3,
      //metalness: 1,
      shading: THREE.SmoothShading,
      //shading:THREE.FlatShading,
      side: THREE.DoubleSide,
    });

    this.materials = [
      material,
      material, // Left face
      material, // Top face
      material, // Bottom face
      material, // Front face
      material, // Back face
    ];

    this.geometry = new THREE.BoxGeometry(10, 10, 10);
    this.mesh = new THREE.Mesh(this.geometry, this.materials);

    this.mesh.position.set(x, y, z);
  }

  setTintColor() {
    let setColor = 0x000000;
    return setColor;
  }

  setColorText() {
    let setColor = "#ffffff";
    return setColor;
  }

  createTexture(texts, size) {
    let nbText = texts.length;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 256;
    let distance = canvas.width / (nbText + 1);

    context.fillStyle = this.setTintColor(); //BG color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = this.setColorText(); //TEXT color
    context.font = size + " Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (let i = 0; i < nbText; i++) {
      const text = texts[i];
      context.fillText(text, canvas.width / 2, distance * (i + 1));
    }
    const texture = new THREE.CanvasTexture(canvas);

    return texture;
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }
}
