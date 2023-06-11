import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Base
 */
const gui = new dat.GUI();
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Particles
 */
// Geometry
const ROW = 20;
const COLUMN = 40;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(ROW * COLUMN * 3);
const colors = new Float32Array(ROW * COLUMN * 3);

// Generate points grid
for (let i = 0; i < ROW; i++) {
  for (let j = 0; j < COLUMN; j++) {
    positions[i * COLUMN + j + 0] = j // X value
    positions[i * COLUMN + j + 1] = 0 // Y value
    positions[i * COLUMN + j + 2] = i // Z value 
    colors[i * COLUMN + j + 0] = Math.random();
    colors[i * COLUMN + j + 1] = Math.random();
    colors[i * COLUMN + j + 2] = Math.random();
  }
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();