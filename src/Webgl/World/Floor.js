import * as THREE from 'three'
import Webgl from '../Webgl.js'
import floorVertex from '../shaders/floorVertex.glsl'
import floorFragment from '../shaders/floorFragment.glsl'

export default class Floor {
  constructor() {
    this.webgl = new Webgl();
    this.scene = this.webgl.scene;
    this.debug = this.webgl.debug;
    this.parameters = {
      color: '#808080'
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(200, 200, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: floorVertex,
      fragmentShader: floorFragment,
      uniforms: {
        uColor: { value: new THREE.Color(this.parameters.color) },
        uGridSize: { value: 70 },
        uLineWeight: { value: 0.035 },
        uOpacity: { value: 0.05 }
      }
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.scene.add(this.mesh);

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Floor');
      this.debugFolder.addColor(this.parameters, 'color')
        .name('color').onChange(value => {
          this.material.uniforms.uColor.value.set(value);
        });
      this.debugFolder.add(this.material.uniforms.uGridSize, 'value')
        .min(50).max(99).step(0.1).name('gridSize');
      this.debugFolder.add(this.material.uniforms.uLineWeight, 'value')
        .min(0.005).max(0.05).step(0.001).name('lineWeight');
      this.debugFolder.add(this.material.uniforms.uOpacity, 'value')
        .min(0.01).max(0.5).step(0.01).name('opacity');
    }
  }
}