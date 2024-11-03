import Cube from "./Cube";
import * as THREE from "three"


export default class CubeExp extends Cube {
    constructor(x, y, z) {
        super(x, y, z)
        this.addText()
    }

    addToScene(scene) {
        scene.add(this.mesh)
    }

    addText() {
        let texture = this.createTexture(["Experiences"], '20px')
        this.materials[this.front] = new THREE.MeshLambertMaterial({ map: texture })
    }
}