import * as TRHEE from 'three'
import Webgl from '../Webgl.js'
import Physics from './Physics.js'

export default class Contents {
  constructor() {
    this.webgl = new Webgl();
    this.scene = this.webgl.scene;
    this.sizes = this.webgl.sizes;
    this.debug = this.webgl.debug;

    this.parameters = {
      color: '#eaee17',
      opacity: 0.6,
      count: 10,
      scale: 1.3,
      force: 0.8,
      forceAlphaTarget: 0.6
    }
    this.physics = new Physics(this.parameters);
    this.nodes = this.physics.nodes;

    this.setGroup();
    this.setMaterial();
    this.setMesh();
  }

  setGroup() {
    this.group = new TRHEE.Group();
    this.scene.add(this.group);
    this.group.rotateX(- Math.PI * 0.5);
    this.group.position.set(-this.sizes.width / 2, 0, -this.sizes.height / 2);
  }

  setMaterial() {
    this.material = new TRHEE.MeshBasicMaterial({ 
      color: this.parameters.color,
      transparent: true,
      opacity: this.parameters.opacity
    });
  }

  setMesh() {
    this.nodes.forEach(node => {
      this.mesh = new TRHEE.Mesh(new TRHEE.CircleGeometry(node.r), this.material);
      this.mesh.position.x = node.x;
      this.mesh.position.y = - node.y;
      this.mesh.position.z = 0;
      this.group.add(this.mesh);
    });

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Contents');
      this.debugFolder.addColor(this.parameters, 'color')
        .name('color').onChange(value => {
          this.material.color.set(value);
        });
      this.debugFolder.add(this.parameters, 'opacity')
        .min(0).max(1).step(0.01).name('opacity').onFinishChange(value => {
          this.material.opacity = value;
        });
    }
  }

  update() {
    this.nodes.forEach((node, i) => {
      this.group.children[i].position.set(node.x, - node.y, 0);
    });
  }
}