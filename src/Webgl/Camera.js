import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Webgl from './Webgl.js'

export default class Camera {
  constructor() {
    this.webgl = new Webgl();
    this.sizes = this.webgl.sizes;
    this.aspect = this.sizes.width / this.sizes.height;
    this.aspectStart = this.aspect;
    this.frustumH = this.sizes.height;
    this.frustumW = this.sizes.width;
    this.zoomH = this.sizes.preHeight;
    this.zoomW = this.sizes.preWidth;
    this.scene = this.webgl.scene;
    this.canvas = this.webgl.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.OrthographicCamera(
      this.frustumW / - 2, this.frustumW / 2, 
      this.frustumH / 2, this.frustumH / - 2, 1, 400);
    this.instance.position.set(0, 100, 0);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.aspect = this.sizes.width / this.sizes.height;
    let width, height = null;
    if (this.aspect > this.aspectStart) {
      height = this.frustumH;
      width = height * this.aspect;
    } else {
      width = this.frustumW;
      height = width / this.aspect;
    }
    this.instance.left = - width / 2;
    this.instance.right = width / 2;
    this.instance.top = height / 2;
    this.instance.bottom = - height / 2;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}