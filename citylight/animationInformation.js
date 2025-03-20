export function animationInformationOn() {
  let domElement = document.getElementsByClassName("informationsExp")[0];
  domElement.animate(
    [
      { right: domElement.style.right }, // Position initiale
      { right: "0" }, // Position finale
    ],
    {
      duration: 500,
      easing: "ease-in-out",
      fill: "forwards", // Pour garder la position finale
    }
  );
  return 0;
}

export function animationInformationOff() {
  let domElement = document.getElementsByClassName("informationsExp")[0];
  domElement.animate(
    [
      { right: domElement.style.right }, // Position initiale
      { right: "-30%" }, // Position finale
    ],
    {
      duration: 500,
      easing: "ease-in-out",
      fill: "forwards", // Pour garder la position finale
    }
  );
  return 0;
}
