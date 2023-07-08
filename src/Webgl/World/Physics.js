import Webgl from '../Webgl.js'
import * as d3 from 'd3-selection'
import * as d3f from 'd3-force'
import * as d3d from 'd3-drag'

export default class Physics {
  constructor(parameters) {
    this.count = parameters.count;
    this.radiusMax = parameters.radiusMax;
    this.radiusMin = parameters.radiusMin;
    this.force = parameters.force;
    this.webgl = new Webgl();
    this.sizes = this.webgl.sizes;

    this.randomPtsGenerator();
    this.joinData();
    this.forceSimulation();
    this.initDrag();
  }

  randomPtsGenerator() {
    this.nodes = [];
    for (let i = 0; i < this.count; i++) {
      const node = {
        x: Math.random() * this.sizes.width,
        y: Math.random() * this.sizes.height,
        r: Math.random() * (this.radiusMax - this.radiusMin) + this.radiusMin
      }
      this.nodes.push(node);
    }
  }

  joinData() {
    this.circles = d3.select('.nodes')
      .selectAll('circle')
      .data(this.nodes)
      .join('circle')
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  forceSimulation() {
    const simulationNodes = d3f.forceSimulation(this.nodes)
      .force('charge', d3f.forceManyBody().strength(this.force))
      .force('center', d3f.forceCenter(this.sizes.width / 2, this.sizes.height / 2))
      .force('collision', d3f.forceCollide().radius(d => d.r));

    simulationNodes.on('tick', () => {
      this.circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }

  initDrag() {
    this.drag = d3d.drag()
      // use arrow function for binding, so handleDrag can access Physics(this)
      .on('drag', event => this.handleDrag(event)) 
      .on('start', () => this.forceSimulation());
    this.circles.call(this.drag);
  }

  handleDrag(event) {
    event.subject.x = event.x;
    event.subject.y = event.y;
    this.circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }
}