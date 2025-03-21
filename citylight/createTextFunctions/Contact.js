import * as THREE from "three";

export default function createTextureHello() {
  let texture = getCanva();
  let textureTEL = getCanvaNotSquare();
  // Create materials for each face
  const materials = [
    new THREE.MeshStandardMaterial({ map: textureTEL }), // Right
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Left
    new THREE.MeshStandardMaterial({ map: texture }), // Top
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Bottom
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Front
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Back
  ];
  return materials;
}

function getCanva() {
  // Create a canvas for the texture
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 1024;
  canvas.height = 1024;

  // Fill background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = "120px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Contact", canvas.width / 2, canvas.height / 2);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
function getCanvaNotSquare() {
  // Create a canvas for the texture
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 256;
  canvas.height = 1024;

  // Fill background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  fillText(ctx, canvas, "30px", "Arial", "Mail", 60);
  fillText(ctx, canvas, "15px", "Arial", "savinienbarbotaud@gmail.com", 90);
  fillText(ctx, canvas, "30px", "Arial", "Téléphone", 140);
  fillText(ctx, canvas, "15px", "Arial", "+33 0 00 00 00 00", 170);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function fillText(ctx, canvas, taille, police, text, hauteur) {
  ctx.font = taille + " " + police;
  ctx.fillText(text, canvas.width / 2, hauteur);
}
