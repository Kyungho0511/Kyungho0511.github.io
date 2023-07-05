import * as d3 from 'd3-selection'
import * as d3f from 'd3-force'

export default class Physics {
  constructor(parameters) {
    this.count = parameters.count;
    this.radiusMax = parameters.radiusMax;
    this.radiusMin = parameters.radiusMin;
    this.canvasWidth = parameters.canvasWidth;
    this.canvasHeight = parameters.canvasHeight;

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
      .force('charge', d3f.forceManyBody().strength(-1));

    simulationNodes.on('tick', () => {
      circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }
}