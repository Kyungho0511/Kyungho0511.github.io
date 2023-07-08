import * as THREE from 'three'
import Webgl from './Webgl.js'

export default class Renderer {
  constructor() {
    this.webgl = new Webgl();
    this.canvas = this.webgl.canvas;
    this.sizes = this.webgl.sizes;
    this.scene = this.webgl.scene;
    this.camera = this.webgl.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    console.log(this.sizes.width)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}