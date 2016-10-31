export class CsvNodesGenerator {
  constructor (nodes, edges) {
    this._nodes = nodes
    this._edges = edges
  }

  generate () {
    return 'Id;Label\n' + this._nodes.map((n) => {
      return n.id + ';' + n.label
    }).join('\n')
  }

}

export class CsvEdgesGenerator {
  constructor (nodes, edges) {
    this._nodes = nodes
    this._edges = edges
  }

  generate () {
    return 'Id;Source;Target;Weight\n' + this._edges.map((e) => {
      return e.id + ';' + e.source + ';' + e.target + ';' + e.weight
    }).join('\n')
  }
}
