import { nest } from 'd3-collection'

export default class BaseEdgeComputer {
  constructor (connections, options = {}) {
    this._options = options
    this._connections = connections
    this._edgeBank = {}
    this.computeNodes()
    this.computeEdges()
  }

  computeNodes () { }
  computeEdges () { }
  edges () { return [] }

  setNodeIds () {
    // this._nodes.forEach((n, i) => { n.id = i })
    this._nodes.forEach((n, i) => { n.id = n.label })
  }

  computeGroups () {
    return nest().key(d => d.edge()).entries(this._connections)
  }

  nodes () {
    return this._nodes
  }

  edgeTypes () {
    return Object.keys(this._edgeBank)
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
