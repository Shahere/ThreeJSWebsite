import {
  animationInformationOff,
  animationInformationOn,
} from "./citylight/animationInformation";

document.addEventListener("DOMContentLoaded", function () {
  const iconShow = document.querySelector(".iconShow");

  iconShow.addEventListener("click", function () {
    iconShow.classList.toggle("open");
  });
});
