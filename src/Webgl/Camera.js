import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Webgl from './Webgl.js'

export default class Camera {
  constructor() {
    this.webgl = new Webgl();
    this.sizes = this.webgl.sizes;
    this.scene = this.webgl.scene;
    this.canvas = this.webgl.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.OrthographicCamera(
      - this.sizes.width / 2, this.sizes.width / 2, 
      this.sizes.height / 2, - this.sizes.height / 2, 1, 400);
    this.instance.position.set(0, 100, 0);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.left = - this.sizes.width / 2;
    this.instance.right = this.sizes.width / 2;
    this.instance.top = this.sizes.height / 2;
    this.instance.bottom = - this.sizes.height / 2;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}