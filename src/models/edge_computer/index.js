import SimpleEdgeComputer from './simple'
import BigraphEdgeComputer from './bigraph'

export default class EdgeComputer {
  constructor (connections, options = {}) {
    this._options = options

    if (options.bigraph && !options.preserveBigraph) {
      this._computer = new BigraphEdgeComputer(connections)
    } else {
      this._computer = new SimpleEdgeComputer(connections)
    }
  }

  isDirected () {
    return this._options.directed
  }

  nodes () {
    return this._computer.nodes()
  }

  edges () {
    return this._computer.edges()
  }
}
