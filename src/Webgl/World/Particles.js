import * as THREE from 'three'
import Webgl from '../Webgl.js'
import backgroundVertex from '../shaders/backgroundVertex.glsl'
import backgroundFragment from '../shaders/backgroundFragment.glsl'

export default class Particles {
  constructor() {
    this.webgl = new Webgl();
    this.scene = this.webgl.scene;
    this.clock = this.webgl.clock;
    this.debug = this.webgl.debug;
    this.parameters = {
      count: 2000,
      dist: 60,
      size: 10,
      color: '#ccbb00'
    }

    this.generateParticles();
  }

  generateParticles = () => {
    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
      this.scene.remove(this.particles);
      this.debug.active && this.debugFolder.destroy();
    }

    // Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.parameters.count * 3);
    const scales = new Float32Array(this.parameters.count);
    const randoms = new Float32Array(this.parameters.count);

    for (let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;

      // Positions
      const randomX = (Math.random() * 2 - 1) * this.parameters.dist;
      const randomY = (Math.random() * 2 - 1) * this.parameters.dist;
      const randomZ = (Math.random() * 2 - 1) * this.parameters.dist;

      positions[i3 + 0] = randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = randomZ;

      // Scales
      scales[i] = Math.random() * this.parameters.size;

      // Randoms
      randoms[i] = Math.random() * 2 - 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    // Material
    const material = new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      vertexShader: backgroundVertex,
      fragmentShader: backgroundFragment,
      uniforms: {
        uColor: { value: new THREE.Color(this.parameters.color) },
        uTime: { value: 0 },
        
        uMovementHeight: { value: 7 },
        uMovementSpeed: { value: 0.6 },
        uScaleSpeed: { value: 1.5 },
        
        uNoiseHeight: { value: 3 },
        uNoiseFrequency: { value: 20},
        uNoiseSpeed:{ value: 0.4 }
      }
    });

    // Particles
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Particles');
      this.debugFolder.addColor(this.parameters, 'color')
        .name('color').onChange(value => {
          material.uniforms.uColor.value.set(value);
        });
      this.debugFolder.add(this.parameters, 'count')
        .min(100).max(5000).step(1).name('count')
        .onFinishChange(this.generateParticles);
      this.debugFolder.add(this.parameters, 'dist')
        .min(10).max(200).step(0.1).name('dist')
        .onFinishChange(this.generateParticles);
      this.debugFolder.add(this.parameters, 'size')
        .min(5).max(50).step(0.1).name('size')
        .onFinishChange(this.generateParticles);
      this.debugFolder.add(material.uniforms.uMovementHeight, 'value')
        .min(0).max(30).step(0.1).name('movementHeight');
      this.debugFolder.add(material.uniforms.uMovementSpeed, 'value')
        .min(0).max(5).step(0.1).name('movementSpeed');
      this.debugFolder.add(material.uniforms.uScaleSpeed, 'value')
        .min(0).max(5).step(0.1).name('scaleSpeed');
      this.debugFolder.add(material.uniforms.uNoiseHeight, 'value')
        .min(0).max(10).step(0.1).name('noiseHeight');
      this.debugFolder.add(material.uniforms.uNoiseFrequency, 'value')
        .min(0).max(30).step(0.1).name('noiseFrequency');
      this.debugFolder.add(material.uniforms.uNoiseSpeed, 'value')
        .min(0).max(10).step(0.1).name('noiseSpeed');
    }
  }

  update() {
    this.particles.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}

