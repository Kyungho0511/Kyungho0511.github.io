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
const ROW = 60;
const COLUMN = 60;
const DIST = 1;
const ptsGeometry = new THREE.BufferGeometry();
const ptsPositions = new Float32Array(ROW * COLUMN * 3);

for (let i = 0; i < ROW; i++) {
  for (let j = 0; j < COLUMN; j++) {
    const ptIndex = (i * COLUMN + j) * 3;
    if (i % 2 === 0 && j % 2 === 0) {
      ptsPositions[ptIndex + 0] = j * DIST // X
      ptsPositions[ptIndex + 1] = 0 // Y
      ptsPositions[ptIndex + 2] = i * DIST // Z
    } else if (i % 2 === 1 && j % 2 === 1) {
      ptsPositions[ptIndex + 0] = j * DIST // X
      ptsPositions[ptIndex + 1] = 0 // Y
      ptsPositions[ptIndex + 2] = i * DIST // Z
    }
    
  }
}
ptsGeometry.setAttribute('position', new THREE.BufferAttribute(ptsPositions, 3));

// Texture
const textureLoader = new THREE.TextureLoader();
const ptsTextureGreen = textureLoader.load('/point_green01.png');

// Material
const ptsMaterial = new THREE.PointsMaterial({
  map: ptsTextureGreen,
  size: 0.5,
  sizeAttenuation: true,
  transparent: true,
  depthWrite: false
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
camera.position.set(0, 24, 24);
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