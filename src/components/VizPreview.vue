<template>
  <div id='viz-preview'>
    <button @click="draw" v-if="json">Redraw</button>
    <svg id='preview'></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'viz-preview',
  props: ['json'],
  data () {
    return {
      width: 400,
      height: 400
    }
  },
  watch: {
    json () {
      this.draw()
    }
  },
  mounted () {
    window.addEventListener('resize', this.resized)

    this.draw()
  },
  methods: {
    resized () {
      let a = d3.select('#viz-preview').node().parentNode.getBoundingClientRect()
      let b = d3.select('#viz-preview').node().getBoundingClientRect()

      let updated = false

      let newWidth = d3.min([b.width, a.width])
      if (newWidth !== this.width) {
        this.width = newWidth
        updated = true
      }

      let newHeight = a.height - (b.top - a.top) - 10
      if (newHeight !== this.height) {
        this.height = newHeight
        updated = true
      }

      if (updated) {
        this.draw()
      }
    },
    draw () {
      if (!this.json) {
        return
      }

      let svg = d3.select('#preview').attr('height', this.height).attr('width', this.width)
      let graph = JSON.parse(this.json)

      let xPositionScale = d3.scaleLinear().domain([0, this.width]).range([0, this.width]).clamp(true)
      let yPositionScale = d3.scaleLinear().domain([0, this.height]).range([0, this.height]).clamp(true)
      let colorScale = d3.scaleOrdinal().range(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'])

      let charge = d3.forceManyBody()
        .strength(-20)
        .distanceMax(150)

      let attraction = d3.forceLink()
        .id((d) => d.id)
        .strength((d) => d.weight / 50)

      let center = d3.forceCenter(this.width / 2, this.height / 2)

      let simulation = d3.forceSimulation()
          .force('link', attraction)
          .force('charge', charge)
          .force('center', center)

      // remove all old lines and nodes to start fresh
      svg.selectAll('text').remove()
      svg.selectAll('line').remove()
      svg.selectAll('circle').remove()

      let link = svg.selectAll('line')
        .data(graph.links)
        .enter().append('line')
        .attr('stroke-width', (d) => d.weight)
        .attr('stroke', function (d) {
          return colorScale(d.relationship)
        })

      let text = svg.selectAll('text')
        .data(graph.nodes)
        .enter().append('text')
        .text((d) => d.label)
        .style('font-family', 'Helvetica')
        .style('font-size', '10px')
        .style('fill', '#333333')
        .attr('dx', 5)
        .attr('dy', -5)

      let node = svg.selectAll('circle')
        .data(graph.nodes)
        .enter().append('circle')
        .attr('fill', '#333')
        .attr('r', 4)
        .on('mouseover', function (d) {
          console.log(d)
        })
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))

      simulation
        .nodes(graph.nodes)
        .on('tick', ticked)

      simulation.force('link')
        .links(graph.links)

      function ticked () {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)

        node
          .attr('cx', (d) => xPositionScale(d.x))
          .attr('cy', (d) => yPositionScale(d.y))
        text
          .attr('x', (d) => xPositionScale(d.x))
          .attr('y', (d) => yPositionScale(d.y))
      }

      function dragstarted (d) {
        if (!d3.event.active) {
          simulation.alphaTarget(0.3).restart()
        }
        d.fx = d.x
        d.fy = d.y
      }

      function dragged (d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }

      function dragended (d) {
        if (!d3.event.active) {
          simulation.alphaTarget(0.1)
        }
        d.fx = null
        d.fy = null
      }
    }
  }
}
</script>

<style scoped>
button {
  position: absolute;
  bottom: 5px;
  right: 15px;
}
</style>

