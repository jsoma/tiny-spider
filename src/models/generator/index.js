import { CsvNodesGenerator, CsvEdgesGenerator } from './csv_generator'
import JsonGenerator from './json_generator'
import GexfGenerator from './gexf_generator'

const generators = {
  'json': JsonGenerator,
  'csv-edges': CsvEdgesGenerator,
  'csv-nodes': CsvNodesGenerator,
  'gexf': GexfGenerator
}

export default class Generator {

  constructor (computer) {
    this._directed = computer.isDirected()
    this._nodes = computer.nodes()
    this._edges = computer.edges()
  }

  generate (filetype) {
    const generator = new generators[filetype](this._nodes, this._edges, this._directed)
    return generator.generate()
  }
}
