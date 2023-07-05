import * as THREE from 'three'
import Webgl from '../Webgl.js'
import Particles from './Particles.js'
import Floor from './Floor.js'

export default class World {
  constructor() {
    this.webgl = new Webgl();
    this.scene = this.webgl.scene;
    this.floor = new Floor();
    this.particles = new Particles();
  }

  update() {
    this.particles && this.particles.update();
  }
}