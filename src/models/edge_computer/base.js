import { nest } from 'd3-collection'

export default class BaseEdgeComputer {
  constructor (connections, options = {}) {
    this._options = options
    this._connections = connections
    this._edgeBank = {}
    this.computeNodes()
    this.computeEdges()
  }

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

    /*
      Nodes have a label, an id, and all of the other data.
    */
    this._nodes = Object.values(tempNodes)
    this.setNodeIds()
  }

  setNodeIds () {
    // this._nodes.forEach((n, i) => { n.id = i })
    this._nodes.forEach((n, i) => { n.id = n.label })
  }

  computeGroups () {
    return nest().key(d => d.edge()).entries(this._connections)
  }

  /*
   Group together e.g. people by classes, then add an edge
   between each classmate pair
  */
  computeEdges () {
    let nodeGroups = this.computeGroups()

    for (let group of nodeGroups) {
      for (let i = 0; i < group.values.length; i++) {
        for (let j = 0; j < i; j++) {
          this.addEdgeByName(group.values[i].name(), group.values[j].name())
        }
      }
    }
  }

  nodes () {
    return this._nodes
  }

  edgeTypes () {
    return Object.keys(this._edgeBank)
  }
  /*
    This seems inefficient. It *is* inefficient.
  */
  edges () {
    let edges = []
    const labels = this._nodes.map((n) => n.label)

    for (let type of this.edgeTypes()) {
      for (let i = 0; i < labels.length; i++) {
        for (let j = 0; j < i; j++) {
          let w = this.undirectedWeight(labels[i], labels[j], type)
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
      edges.forEach((e, i) => { e.id = i })
      return edges
    }
  }

  /*
    Directed weight between two nodes
  */
  directedWeight (source, target, type) {
    try {
      return this._edgeBank[type][source][target] || 0
    } catch (e) {
      return 0
    }
  }

  /*
    Undirected weight between two nodes
  */
  undirectedWeight (source, target, type = 'default') {
    return this.directedWeight(source, target, type) + this.directedWeight(target, source, type)
  }

  /*
    Add 1 to directed weight between two nodes
  */
  addEdgeByName (source, target, type = 'default') {
    if (!(type in this._edgeBank)) {
      this._edgeBank[type] = {}
    }
    if (!(source in this._edgeBank[type])) {
      this._edgeBank[type][source] = {}
    }
    this._edgeBank[type][source][target] = this._edgeBank[type][source][target] || 0
    this._edgeBank[type][source][target]++
  }
}
