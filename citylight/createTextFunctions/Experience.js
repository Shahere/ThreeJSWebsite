import * as THREE from "three";

export default function createTextureHello() {
  let texture = getCanva();
  let textureApi = getCanvaApizee();
  let textureArm = getCanvaArmee();
  let textureVoile = getCanvaVoile();
  // Create materials for each face
  const materials = [
    new THREE.MeshStandardMaterial({ map: textureArm }), // Right
    new THREE.MeshStandardMaterial({ map: textureApi }), // Left
    new THREE.MeshStandardMaterial({ map: texture }), // Top
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Bottom
    new THREE.MeshStandardMaterial({ color: 0xffffff }), // Front
    new THREE.MeshStandardMaterial({ map: textureVoile }), // Back
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
  ctx.fillText("Experience", canvas.width / 2, canvas.height / 2);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
function getCanvaApizee() {
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
  ctx.fillText("Apizee", canvas.width / 2, 60);

  ctx.textAlign = "start";
  fillText(ctx, canvas, "18px", "Arial", "Développeur / Mainteneur", 120);
  fillText(ctx, canvas, "20px", "Arial", "de la libraire apiRTC", 150);

  fillText(ctx, canvas, "20px", "Arial", "JS/TS, développement", 210);
  fillText(ctx, canvas, "20px", "Arial", "Administration système", 240);

  fillText(ctx, canvas, "20px", "Arial", "Monde de l'entreprise", 300);
  fillText(ctx, canvas, "18px", "Arial", "Transert de compétences", 330);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function getCanvaArmee() {
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
  ctx.fillText("Armée", canvas.width / 2, 60);

  ctx.textAlign = "start";
  fillText(ctx, canvas, "20px", "Arial", "Développeur", 120);
  fillText(ctx, canvas, "20px", "Arial", "d'application web", 150);

  fillText(ctx, canvas, "20px", "Arial", "Django - Python", 210);
  fillText(ctx, canvas, "20px", "Arial", "Javascript", 240);

  fillText(ctx, canvas, "20px", "Arial", "Premiere experience", 300);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function getCanvaVoile() {
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
  ctx.fillText("Voile", canvas.width / 2, 60);

  ctx.textAlign = "start";
  fillText(ctx, canvas, "20px", "Arial", "Moniteur", 120);
  fillText(ctx, canvas, "20px", "Arial", "de voile", 150);

  fillText(ctx, canvas, "20px", "Arial", "Optimist et catamaran", 210);
  fillText(ctx, canvas, "20px", "Arial", "Permis bateau", 240);

  fillText(ctx, canvas, "20px", "Arial", "Responsabilitées", 300);
  fillText(ctx, canvas, "18px", "Arial", "Transert de compétences", 330);

  // Create a texture from the canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function fillText(ctx, canvas, taille, police, text, hauteur) {
  ctx.font = taille + " " + police;
  // 0 = full on the left
  ctx.fillText(text, 10, hauteur);
}
