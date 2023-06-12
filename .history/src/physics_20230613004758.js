'use strict'

/**
 * Base nodes grid
 */
const COUNT = 200;
const RADIUS_MAX = 5;
const RADIUS_MIN = 2;
export const WIDTH = 200;
export const HEIGHT = 150;

// Create random nodes
export const nodes = randomPtsGenerator();
function randomPtsGenerator() {
  const nodes = [];
  for (let i = 0; i < COUNT; i++) {
    const node = {
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      r: Math.random() * (RADIUS_MAX - RADIUS_MIN) + RADIUS_MIN
    }
    nodes.push(node);
  }
  return nodes;
}

// Bind data and draw nodes
const circles = d3.select('.nodes')
  .selectAll('circle')
  .data(nodes)
  .join('circle')
  .attr('r', d => d.r)
  .attr('cx', d => d.x)
  .attr('cy', d => d.y);

// Create force simulation
const simulationNodes = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-0.2));

// Indicate how to update the graph for each tick
simulationNodes.on('tick', () => {
  circles
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);
})
