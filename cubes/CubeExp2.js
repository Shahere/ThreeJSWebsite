import Cube from "./Cube";
import * as THREE from "three";

export default class CubeExp2 extends Cube {
  constructor(x, y, z) {
    super(x, y, z);
    this.addText();
  }

  addText() {
    let texture = this.createTexture(["Experiences"], "40px");
    this.materials[this.front] = new THREE.MeshLambertMaterial({
      map: texture,
    });

    texture = this.createTexture(
      [
        "Current work",
        "Apizee - web developper",
        "Goals : ",
        'Develop JS lib "apiRTC"',
      ],
      "20px"
    );
    this.materials[this.left] = new THREE.MeshLambertMaterial({ map: texture });
  }
}
