import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Webgl from './Webgl.js'

export default class Camera {
  constructor() {
    this.webgl = new Webgl();
    this.sizes = this.webgl.sizes;
    this.scene = this.webgl.scene;
    this.canvas = this.webgl.canvas;
    this.aspect = this.sizes.width / this.sizes.height;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    const FRUSTUM = 40;
    const X = 0, Y = 100, Z = 200;
    this.instance = new THREE.OrthographicCamera(
      -FRUSTUM * this.aspect, FRUSTUM * this.aspect, FRUSTUM, -FRUSTUM, 1, 400);
    this.instance.position.set(X, Y, Z);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.aspect;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}