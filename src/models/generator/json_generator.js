export default class JsonGenerator {
  constructor (nodes, edges) {
    this._nodes = nodes
    this._edges = edges
  }

  generate () {
    return JSON.stringify({
      'nodes': this._nodes,
      'links': this._edges.map((e) => {
        return {
          'id': e.id,
          'source': e.source,
          'target': e.target,
          'weight': e.weight,
          'relationship': e.type
        }
      })
    })
  }
}
