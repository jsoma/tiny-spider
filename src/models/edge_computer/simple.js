import BaseEdgeComputer from './base'

export default class SimpleEdgeComputer extends BaseEdgeComputer {
  computeNodes () {
    let tempNodes = {}

    // Names get first dibs on populating nodes
    for (let connection of this._connections) {
      if (!(connection.name() in tempNodes)) {
        tempNodes[connection.name()] = connection.toNode()
      }
    }

    // But fill in missing ones via edges
    for (let connection of this._connections) {
      if (!(connection.edge() in tempNodes)) {
        tempNodes[connection.edge()] = { label: connection.edge() }
      }
    }

    /*
      Nodes have a label, an id, and all of the other data.
    */
    this._nodes = Object.values(tempNodes)
    this._nodes.forEach((n, i) => { n.id = i })
  }

  computeEdges () {
    for (let connection of this._connections) {
      this.addEdgeByName(connection.name(), connection.edge(), connection.edgeType())
    }
  }

  /*
    Go through every pair looking for weights
  */
  edges () {
    let edges = []
    const labels = this._nodes.map((n) => n.label)

    for (let type of this.edgeTypes()) {
      for (let i = 0; i < labels.length; i++) {
        for (let j = 0; j < labels.length; j++) {
          if (i === j) { continue }

          let w = this.directedWeight(labels[i], labels[j], type)
          if (w > 0) {
            edges.push({
              type: type,
              source: i,
              source_name: labels[i],
              target: j,
              target_name: labels[j],
              weight: w
            })
          }
        }
      }
    }
    edges.forEach((e, i) => { e.id = i })
    return edges
  }

}
