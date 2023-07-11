import Webgl from '../Webgl.js'
import * as d3 from 'd3-selection'
import * as d3f from 'd3-force'
import * as d3d from 'd3-drag'

export default class Physics {
  constructor(parameters) {
    this.webgl = new Webgl();
    this.sizes = this.webgl.sizes;
    this.count = parameters.count;
    this.scale = parameters.scale;
    this.radiusMax = this.scale * Math.sqrt(this.sizes.width * this.sizes.height) / 10;
    this.radiusMin = this.scale * Math.sqrt(this.sizes.width * this.sizes.height) / 12;
    this.force = (this.sizes.width * this.sizes.height) / 3000 * parameters.force;
    this.forceAlphatarget = parameters.forceAlphaTarget;

    this.randomPtsGenerator();
    this.joinData();
    this.forceSimulation();
    this.initDrag();
  }

  randomPtsGenerator() {
    this.nodes = [];
    for (let i = 0; i < this.count; i++) {
      const node = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * (this.radiusMax - this.radiusMin) + this.radiusMin
      }
      this.nodes.push(node);
    }
  }

  joinData() {
    this.svg = d3.select('#physics')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', `0 0 ${this.sizes.width} ${this.sizes.height}`);

    this.circles = d3.select('.nodes')
      .selectAll('circle')
      .data(this.nodes)
      .join('circle')
      .attr('r', d => d.r)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  forceSimulation() {
    if (!this.simulationNodes) {
      this.simulationNodes = d3f.forceSimulation(this.nodes)
        .force('charge', d3f.forceManyBody().strength(this.force))
        .force('center', d3f.forceCenter(this.sizes.width / 2, this.sizes.height / 2))
        .force('collision', d3f.forceCollide().radius(d => d.r));
    } else {
      this.simulationNodes.alphaTarget(this.forceAlphatarget).restart();
    }

    this.simulationNodes.on('tick', () => {
      this.circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }

  initDrag() {
    this.drag = d3d.drag()
      // use arrow function for binding, so handleDrag can access Physics(this)
      .on('drag', event => this.handleDrag(event)) 
      .on('start', () => {
        this.forceSimulation();
      });
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