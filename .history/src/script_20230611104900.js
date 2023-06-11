import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Base
 */
const gui = new dat.GUI();
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

/**
 * Objects
 */
// Particles
const GRID_DIST = 10;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array();
