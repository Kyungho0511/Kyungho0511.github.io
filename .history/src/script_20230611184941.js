import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const ptsTextureGreen1 = textureLoader.load('/point_green01.png');
const ptsTextureGreen2 = textureLoader.load('/point_green02.png');
const ptsTextureGrey = textureLoader.load('/point_grey.png');
// ptsTextureGrey.minFilter = THREE.NearestFilter;

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
 * Points grid
 */
// Geometry 
const ROW = 50;
const COLUMN = 50;
const DIST = 1;
const ptsGeometry = new THREE.BufferGeometry();
const ptsPositions = new Float32Array(ROW * COLUMN * 3);

for (let i = 0; i < ROW; i++) {
  for (let j = 0; j < COLUMN; j++) {
    const ptIndex = (i * COLUMN + j) * 3; 
    ptsPositions[ptIndex + 0] = j * DIST // X value
    ptsPositions[ptIndex + 1] = 0 // Y value
    ptsPositions[ptIndex + 2] = i * DIST // Z value 
  }
}
ptsGeometry.setAttribute('position', new THREE.BufferAttribute(ptsPositions, 3));

// Material
const ptsMaterial = new THREE.PointsMaterial({
  map: ptsTextureGreen1,
  size: 2,
  sizeAttenuation: true,
  transparent: true
});

// Points
const pts = new THREE.Points(ptsGeometry, ptsMaterial);
pts.translateX(- COLUMN * DIST / 2);
pts.translateZ(- ROW * DIST / 2);
scene.add(pts);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 20, 20);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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