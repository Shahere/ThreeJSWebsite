import Cube from "./Cube";
import * as THREE from "three"


export default class CubeContact extends Cube {
    constructor(x, y, z) {
        super(x, y, z)
        this.addText()
    }

    addToScene(scene) {
        scene.add(this.mesh)
    }

    addText() {
        let texture = this.createTexture(["Contact me !"], '40px')
        this.materials[this.back] = new THREE.MeshLambertMaterial({ map: texture })

        texture = this.createTexture(["My phone number", "+33 6 37 58 26 89"], '20px')
        this.materials[this.left] = new THREE.MeshLambertMaterial({ map: texture })

        texture = this.createTexture(["My email", "savinienbarbotaud@gmail.com"], '17px')
        this.materials[this.front] = new THREE.MeshLambertMaterial({ map: texture })
    }
}