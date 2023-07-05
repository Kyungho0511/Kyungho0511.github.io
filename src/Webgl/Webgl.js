import * as THREE from 'three'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Debug from './Debug.js'
// import { nodes, WIDTH, HEIGHT } from './Physics.js'

let instance = null;

export default class Webgl {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.debug = new Debug();
    this.setBackground();
    this.setAxesHelper();
    this.world = new World();

    window.addEventListener('resize', () => {
      this.camera.resize();
      this.renderer.resize();
    });

    const tick = () => {
      this.camera.update();
      this.renderer.update();
      this.world.update();
      window.requestAnimationFrame(tick);
    }
    tick();
  }

  setBackground() {
    this.scene.parameters = {
      color: '#fff7e0'
    }
    this.scene.background = new THREE.Color(this.scene.parameters.color);

    if (this.debug.active) {
      this.debug.ui.addColor(this.scene.parameters, 'color')
        .name('backgroundColor')
        .onChange(value => {
          this.scene.background.set(value);
        });
    }
  }

  setAxesHelper() {
    const axesHelper = new THREE.AxesHelper(10);
    axesHelper.visible = false;
    this.scene.add(axesHelper);

    if (this.debug.active) {
      this.debug.ui.add(axesHelper, 'visible').name('axesHelper');
    }
  }
}