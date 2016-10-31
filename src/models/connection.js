export default class Connection {
  constructor (d, nameCol, edgeCol, edgeTypeCol = null) {
    this._d = d
    this._nameCol = nameCol
    this._edgeCol = edgeCol
    this._edgeTypeCol = edgeTypeCol
  }

  name () {
    return this._d[this._nameCol]
  }

  edge () {
    return this._d[this._edgeCol]
  }

  edgeType () {
    if (this._edgeTypeCol) {
      return this._d[this._edgeTypeCol]
    }
  }

  /*
    Every node has an id and a label - the id
    is assigned in the computer, though.

    Also, We overwrite 'label' keys and rename them
    as 'original_label'.
  */
  toNode () {
    const cloned = Object.assign({}, this._d)
    if ('label' in cloned) {
      cloned.original_label = cloned.label
    }
    cloned.label = this.name()
    delete cloned[this._edgeCol]

    if (cloned._edgeTypeCol) {
      delete cloned[this._edgeTypeCol]
    }

    return cloned
  }

}
