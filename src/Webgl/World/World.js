import * as THREE from 'three'
import Webgl from '../Webgl.js'
import Particles from './Particles.js'

export default class World {
  constructor() {
    this.webgl = new Webgl();
    this.scene = this.webgl.scene;
    this.particles = new Particles();
  }

  update() {
    this.particles && this.particles.update();
  }
}