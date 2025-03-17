import Cube from "./Cube";
import * as THREE from "three";

export default class CubeGraduation extends Cube {
  constructor(x, y, z) {
    super(x, y, z);
    this.addText();
  }

  addText() {
    let texture = this.createTexture(["Graduations"], "40px");
    this.materials[this.front] = new THREE.MeshLambertMaterial({
      map: texture,
    });
  }
}
