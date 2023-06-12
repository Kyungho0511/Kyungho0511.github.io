'use strict'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { nodes, WIDTH, HEIGHT } from './physics.js'

/**
 * Base
 */
// Parameters
const parameters = {
  color: '#fff7e0'
}

// Scene
const gui = new dat.GUI();
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
scene.background = new THREE.Color(parameters.color);
gui.addColor(parameters, 'color').onChange(value => {
  scene.background.set(value);
});

// Axes
const axesHelper = new THREE.AxesHelper(5);
axesHelper.visible = false;
scene.add(axesHelper);


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  aspect: window.innerWidth / window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  console.log(camera.left);
});


/**
 * Objects
 */
// Render nodes from 'physics.js' with circle meshes
const circleGeometry = new THREE.CircleGeometry(1, 32);
const circleMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
const circleGroup = new THREE.Group();
scene.add(circleGroup);
circleGroup.rotateX(Math.PI * 0.5);
circleGroup.position.set(- WIDTH / 2, 0, - HEIGHT / 3);

for (const node of nodes) {
  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circle.position.x = node.x;
  circle.position.y = node.y;
  circleGroup.add(circle);
}


/**
 * Camera
 */
const frustum = 50;
const camera = new THREE.OrthographicCamera(
  -frustum * sizes.aspect, frustum * sizes.aspect, -frustum, frustum, 1, 400);
camera.position.set(0, 100, 200);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
gui.add(controls, 'enabled');


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

  // Update circles positions
  for (let i = 0; i < nodes.length; i++) {
    circleGroup.children[i].position.set(nodes[i].x, nodes[i].y, 0);
  }

  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();