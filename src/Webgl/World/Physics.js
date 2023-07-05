import * as d3 from 'd3-selection'
import * as d3f from 'd3-force'

export default class Physics {
  constructor() {
    this.count = 20;
    this.radiusMax = 5;
    this.radiusMin = 2;
    this.canvasWidth = 100;
    this.canvasHeight = 75;

    this.randomPtsGenerator();
    this.forceSimulation();
  }

  randomPtsGenerator() {
    this.nodes = [];
    for (let i = 0; i < this.count; i++) {
      const node = {
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight,
        r: Math.random() * (this.radiusMax - this.radiusMin) + this.radiusMin
      }
      this.nodes.push(node);
    }
  }

  forceSimulation() {
    const circles = d3.select('.nodes')
      .selectAll('circle')
      .data(this.nodes)
      .join('circle')
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
    
    const simulationNodes = d3f.forceSimulation(this.nodes)
      .force('charge', d3f.forceManyBody().strength(-0.2));

    simulationNodes.on('tick', () => {
      circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }
}