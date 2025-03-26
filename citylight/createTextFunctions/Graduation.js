import * as THREE from "three";

export default function createTextureHello() {
  let texture = getCanva();
  let textureENSSAT = getCanvaENSSAT();
  let textureIUT = getCanvaIUT();
  // Create materials for each face
  const materials = [
    new THREE.MeshStandardMaterial({ map: textureENSSAT }), // Right
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Left
    new THREE.MeshStandardMaterial({ map: texture }), // Top
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Bottom
    new THREE.MeshStandardMaterial({ map: textureIUT }), // Front
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
  ctx.fillText("Graduation", canvas.width / 2, canvas.height / 2);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function getCanvaENSSAT() {
  // Create a canvas for the texture
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 220;
  canvas.height = 1024;

  // Fill background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  // No function filltext bc canvas.width/2 for centering the text
  ctx.fillText("ENSSAT", canvas.width / 2, 60);

  ctx.textAlign = "start";
  fillText(ctx, canvas, "20px", "Arial", "Spécialité", 120);
  fillText(ctx, canvas, "20px", "Arial", "Informatique", 150);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function getCanvaIUT() {
  // Create a canvas for the texture
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 220;
  canvas.height = 1024;

  // Fill background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  // No function filltext bc canvas.width/2 for centering the text
  ctx.fillText("IUT", canvas.width / 2, 60);

  ctx.textAlign = "start";
  fillText(ctx, canvas, "20px", "Arial", "Lannion", 120);

  fillText(ctx, canvas, "20px", "Arial", "Informatique", 210);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function fillText(ctx, canvas, taille, police, text, hauteur) {
  ctx.font = taille + " " + police;
  // 0 = full on the left
  ctx.fillText(text, 10, hauteur);
}
