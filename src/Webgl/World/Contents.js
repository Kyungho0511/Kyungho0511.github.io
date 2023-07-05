import * as TRHEE from 'three'
import Webgl from '../Webgl.js'
import Physics from './Physics.js'

export default class Contents {
  constructor() {
    this.webgl = new Webgl();
    this.scene = this.webgl.scene;
    this.debug = this.webgl.debug;
    this.physics = new Physics();
    this.nodes = this.physics.nodes;
    this.parameters = {
      color: 'orange'
    }

    this.setGroup();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGroup() {
    this.group = new TRHEE.Group();
    this.scene.add(this.group);
    this.group.rotateX(- Math.PI * 0.5);
    this.group.position.set(
      -this.physics.canvasWidth / 2, 0, this.physics.canvasHeight / 2);
  }

  setGeometry() {
    this.geometry = new TRHEE.CircleGeometry(6, 64);
  }

  setMaterial() {
    this.material = new TRHEE.MeshBasicMaterial({ color: this.parameters.color });
  }

  setMesh() {
    this.nodes.forEach(node => {
      this.mesh = new TRHEE.Mesh(this.geometry, this.material);
      this.mesh.position.x = node.x;
      this.mesh.position.y = node.y;
      this.group.add(this.mesh);
    });
  }

  update() {
    this.nodes.forEach((node, i) => {
      this.group.children[i].position.set(node.x, node.y, 0);
    });
  }
}