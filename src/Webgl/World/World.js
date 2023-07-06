import * as THREE from 'three'
import Webgl from '../Webgl.js'
import Particles from './Particles.js'
import Floor from './Floor.js'
import Contents from './Contents.js'

export default class World {
  constructor() {
    this.webgl = new Webgl();
    this.scene = this.webgl.scene;
    // this.floor = new Floor();
    this.particles = new Particles();
    this.contents = new Contents();
  }

  update() {
    this.particles && this.particles.update();
    this.contents && this.contents.update();
  }
}