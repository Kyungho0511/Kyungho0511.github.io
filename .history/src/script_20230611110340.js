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
const GRID_DIST = 10;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array();

/**
 * Meshes
 */
const box = new THREE.Mesh(
    new THREE.BoxGeometry,
    new THREE.MeshBasicMaterial()
);
scene.add(box);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
