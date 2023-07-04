'use strict'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import backgroundVertex from './shaders/backgroundVertex.glsl'
import backgroundFragment from './shaders/backgroundFragment.glsl'
// import { nodes, WIDTH, HEIGHT } from './physics.js'

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

gui.addColor(parameters, 'color').name('backgroundColor').onChange(value => {
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
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.left = - FRUSTUM * sizes.width / sizes.height;
  camera.right = FRUSTUM * sizes.width / sizes.height;
  camera.top = FRUSTUM;
  camera.bottom = - FRUSTUM;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Particles
 */
const particlesParam = {
  count: 500,
  dist: 100,
  size: 24,
  color: '#ccbb00'
}

let geometry = null;
let material = null;
let points = null;

const generateParticles = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  // Geometry
  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesParam.count * 3);
  const scales = new Float32Array(particlesParam.count);
  const randoms = new Float32Array(particlesParam.count);

  for (let i = 0; i < particlesParam.count; i++) {
    const i3 = i * 3;

    // Positions
    const randomX = (Math.random() * 2 - 1) * particlesParam.dist;
    const randomY = (Math.random() * 2 - 1) * particlesParam.dist;
    const randomZ = (Math.random() * 2 - 1) * particlesParam.dist;

    positions[i3 + 0] = randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = randomZ;

    // Scales
    scales[i] = Math.random() * particlesParam.size;

    // Randoms
    randoms[i] = Math.random() * 2 - 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

  // Material
  material = new THREE.ShaderMaterial({
    transparent: true,
    vertexColors: true,
    depthWrite: false,
    vertexShader: backgroundVertex,
    fragmentShader: backgroundFragment,
    uniforms: {
      uColor: { value: new THREE.Color(particlesParam.color) },
      uTime: { value: 0 },
      uMovementHeight: { value: 10 },
      uMovementSpeed: { value: 0.2 },
      uScaleSpeed: { value: 2 }
    }
  });

  // Points
  points = new THREE.Points(geometry, material);
  scene.add(points);
}

generateParticles();

const debugFolder = gui.addFolder('particles');
debugFolder.addColor(particlesParam, 'color').name('particleColor').onChange(value => {
  material.uniforms.uColor.value.set(particlesParam.color);
});
debugFolder.add(particlesParam, 'count').min(100).max(2000).step(1).name('particlesCount').onFinishChange(generateParticles);
debugFolder.add(particlesParam, 'dist').min(10).max(200).step(0.1).name('particlesDist').onFinishChange(generateParticles);
debugFolder.add(particlesParam, 'size').min(5).max(50).step(0.1).name('particlesSize').onFinishChange(generateParticles);
debugFolder.add(material.uniforms.uMovementHeight, 'value').min(0).max(30).step(0.1).name('uMovementHeight');
debugFolder.add(material.uniforms.uMovementSpeed, 'value').min(0).max(5).step(0.1).name('uMovementSpeed');
debugFolder.add(material.uniforms.uScaleSpeed, 'value').min(0).max(5).step(0.1).name('uScaleSpeed');

/**
 * Objects
 */
// // Render nodes from 'physics.js' with circle meshes
// const circleGeometry = new THREE.CircleGeometry(1, 32);
// const circleMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
// const circleGroup = new THREE.Group();
// scene.add(circleGroup);
// circleGroup.rotateX(- Math.PI * 0.5);
// circleGroup.position.set(- WIDTH / 2, 0, HEIGHT / 2);

// for (const node of nodes) {
//   const circle = new THREE.Mesh(circleGeometry, circleMaterial);
//   circle.position.x = node.x;
//   circle.position.y = node.y;
//   circleGroup.add(circle);
// }


/**
 * Camera
 */
const FRUSTUM = 40;
const aspect = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(-FRUSTUM * aspect, FRUSTUM * aspect, FRUSTUM, -FRUSTUM, 1, 400);
camera.position.set(0, 100, 200);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
gui.add(controls, 'enabled').name('controls enabled');


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

  // // Update circles positions
  // for (let i = 0; i < nodes.length; i++) {
  //   circleGroup.children[i].position.set(nodes[i].x, nodes[i].y, 0);
  // }

  // Update particles
  material.uniforms.uTime.value = elapsedTime;
  
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();