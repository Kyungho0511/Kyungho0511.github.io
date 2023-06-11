import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
const gui = new dat.GUI();
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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
 * Particles grid
 */
// Geometry 
const ROW = 20;
const COLUMN = 30;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(ROW * COLUMN * 3);
const colors = new Float32Array(ROW * COLUMN * 3);

for (let i = 0; i < ROW; i++) {
  for (let j = 0; j < COLUMN; j++) {
    const pointIndex = (i * COLUMN + j) * 3; 
    positions[pointIndex + 0] = j // X value
    positions[pointIndex + 1] = 0 // Y value
    positions[pointIndex + 2] = i // Z value 
    colors[pointIndex + 0] = 1;
    colors[pointIndex + 1] = 1;
    colors[pointIndex + 2] = 1;
  }
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.5,
  sizeAttenuation: true,
  // transparent: true,
  vertexColors: true
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();