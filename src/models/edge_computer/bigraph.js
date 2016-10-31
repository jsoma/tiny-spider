import BaseEdgeComputer from './base'
import { nest } from 'd3-collection'

export default class BigraphEdgeComputer extends BaseEdgeComputer {
  /*
    Combine all of the nodes with matching names and assign them indices
  */
  computeNodes () {
    let tempNodes = {}
    for (let connection of this._connections) {
      if (!(connection.name() in tempNodes)) {
        tempNodes[connection.name()] = connection.toNode()
      }
    }

    this._nodes = Object.values(tempNodes)
    this._nodes.forEach((n, i) => { n.id = i })
  }

  /*
    Group together e.g. people by classes, then add an edge
    between each classmate pair
  */
  computeEdges () {
    let nodeGroups = nest().key(d => d.edge()).entries(this._connections)

    for (let group of nodeGroups) {
      for (let i = 0; i < group.values.length; i++) {
        for (let j = 0; j < i; j++) {
          this.addEdgeByName(group.values[i].name(), group.values[j].name())
        }
      }
    }
  }

  /*
    ...edges?
  */
  edges () {
    let edges = []
    const labels = this._nodes.map((n) => n.label)

    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < i; j++) {
        let w = this.undirectedWeight(labels[i], labels[j])
        if (w > 0) {
          edges.push({
            type: 'default',
            source: i,
            source_name: labels[i],
            target: j,
            target_name: labels[j],
            weight: w
          })
        }
      }
    }
    edges.forEach((e, i) => { e.id = i })
    return edges
  }

}
