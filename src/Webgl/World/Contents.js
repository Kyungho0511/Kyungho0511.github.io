import * as TRHEE from 'three'

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


// // Update circles positions
// for (let i = 0; i < nodes.length; i++) {
//   circleGroup.children[i].position.set(nodes[i].x, nodes[i].y, 0);
// }