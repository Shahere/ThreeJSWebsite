import * as THREE from "three";

export default function createTextureHello() {
  // Create a canvas for the texture
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 256;
  canvas.height = 256;

  // Fill background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Graduation", canvas.width / 2, canvas.height / 2);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);

  // Create materials for each face
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Right
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Left
    new THREE.MeshStandardMaterial({ map: texture }), // Top
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Bottom
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Front
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Back
  ];
  return materials;
}
