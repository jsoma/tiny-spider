import xml from 'xml'

export default class GexfGenerator {
  constructor (nodes, edges, directed = false) {
    this._nodes = nodes
    this._edges = edges
    this._directed = directed
  }

  generate () {
    return xml([{
      'gexf': [
        {
          '_attr': {
            'xmlns': 'http://www.gexf.net/1.3',
            'version': '1.3',
            'xmlns:viz': 'http://www.gexf.net/1.3/viz',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xsi:schemaLocation': 'http://www.gexf.net/1.3 http://www.gexf.net/1.3/gexf.xsd'
          }
        },
        {
          'meta': [
            { 'creator': 'Networking magic' }
          ]
        },
        {
          'graph': [
            {
              '_attr': {
                'defaultedgetype': this._directed ? 'directed' : 'undirected',
                'mode': 'static',
                'idtype': 'string'
              }
            },
            {
              'nodes': this._nodes.map((n) => {
                return { 'node': [
                  { '_attr': { 'id': n.id, 'label': n.label } }
                ]}
              })
            },
            {
              'links': this._edges.map((e) => {
                return { 'edge': [ { '_attr': { 'id': e.id, 'source': e.source, 'target': e.target, 'weight': e.weight } } ] }
              })
            }
          ]
        }
      ]
    }], { declaration: true })
  }
}
